import { getDistance, isVisible, throttle } from '../utils';

const players = {};
const adminBar = document.getElementById( 'wpadminbar' );

let scrollTimeout;

const handleNext = ( e ) => {
	const el = e.currentTarget.parentElement;
	const scrollCoords = el.clientHeight;
	const scrollDistance = getDistance( el );
	const adminBarHeight = adminBar ? adminBar.clientHeight : 0;

	window.scrollTo( {
		behavior: 'smooth',
		left: 0,
		top: scrollCoords + scrollDistance - adminBarHeight
	} );

	e.preventDefault();
};

const generatePlayer = ( video ) => {
	const id = video.getAttribute( 'id' );
	const parent = video.parentElement;
	const next = parent.parentElement.querySelector( '.next' );

	if ( ! id ) {
		return;
	}

	if ( next ) {
		next.addEventListener( 'click', handleNext );
	}

	players[id] = {
		el: parent,
		player: new YT.Player( id, {
			videoId: id,
			playerVars: {
				autohide: 1,
				// autoplay: 1,
				branding: 0,
				controls: 0,
				disablekb: 1,
				modestbranding: 1,
				mute: 1,
				origin: window.location.origin,
				playlist: id,
				playsinline: 1,
				showinfo: 0,
				wmode: 'transparent'
			},

			events: {
				onReady: ( e ) => {
					// Prevent keyboard interaction with player.
					const playerContainer = document.getElementById( id );
					playerContainer.setAttribute( 'tabIndex', '-1' );

					// Only auto-play video if visible in viewport.
					if ( isVisible( parent ) ) {
						e.target.playVideo();
					}
				},
				onStateChange: ( e ) => {
					if ( e.data === YT.PlayerState.ENDED || e.data === YT.PlayerState.PAUSED ) {
						players[id].player.playVideo();
					}

					if ( e.data === YT.PlayerState.PLAYING ) {
						parent.classList.add( 'ready' );
					}
				}
			}
		} )
	};
};

const createVideos = () => {
	const videos = document.querySelectorAll( '.video-container' );

	videos.forEach( ( video ) => generatePlayer( video ) );
};

const enqueueScript = () => {
	const tag = document.createElement( 'script' );
	const firstScriptTag = document.getElementsByTagName( 'script' )[0];

	tag.src = 'https://www.youtube.com/iframe_api';
	firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );
};

const handleScroll = ( e ) => {

	if ( scrollTimeout ) {
		window.cancelAnimationFrame( scrollTimeout );
	}

	scrollTimeout = window.requestAnimationFrame( () => {

		// Lazy load videos when visible in viewport. Pause when not visible.
		for ( let id in players ) {
			if ( players.hasOwnProperty( id ) ) {
				const parent = players[id].el;
				const player = players[id].player;

				if ( ! player || ! player.playVideo || ! player.pauseVideo ) {
					return;
				}

				if ( isVisible( parent ) ) {
					if ( player.getPlayerState() !== 1 ) {
						player.playVideo();

						delete player[id];
					}
				}
			}
		}
	} );
};

export default () => {
	enqueueScript();

	window.addEventListener( 'scroll', handleScroll );

	window.onYouTubeIframeAPIReady = () => {
		createVideos();
	}

	window.addEventListener( 'load', handleScroll );
};
