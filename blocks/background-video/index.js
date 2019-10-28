import './frontend';

const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.blockEditor;
const { CheckboxControl, PanelBody, TextControl } = wp.components;

const TEMPLATE = [
	[ 'core/heading', { level: 3, placeholder: 'Enter Heading...' } ],
];

registerBlockType( 'dkoo-blocks/background-video', {
	title: 'Background Video',
	icon: 'video-alt3',
	category: 'dkoo',

	attributes: {
		videoUrl: {
			type: 'string'
		},

		showNext: {
			type: 'boolean'
		}
	},

	edit: ( props ) => {
		const { clientId, attributes: { showNext, videoUrl }, setAttributes } = props;
		const videoId = videoUrl ? videoUrl.split( '/' ).pop() : null;

		const onChangeVideoUrl = ( newUrl ) => {
			setAttributes( { videoUrl: newUrl } );
		};

		return (
			<div className={ `dkoo-background-video ${ clientId }` } style={ {
				textAlign: 'center'
			} }>
				<InspectorControls>
					<PanelBody
						title="Background Video"
						icon="video-alt3"
						initialOpen={ true }
					>
						<TextControl
							label="Video URL"
							value={ videoUrl }
							onChange={ onChangeVideoUrl }
						/>

						<CheckboxControl
							label="Show next button?"
							checked={ showNext }
							onChange={ () => setAttributes( { showNext: !showNext } ) }
						/>
					</PanelBody>
				</InspectorControls>

				{ videoId ?
					<div className="placeholder" style={ {
						backgroundImage: `url(https://img.youtube.com/vi/${ videoId }/0.jpg)`,
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						padding: '8rem 0',
						textAlign: 'center'
					} }><InnerBlocks /></div>
					:
					<div className="placeholder" style={ {
						backgroundColor: '#eee',
						padding: '8rem 0',
						textAlign: 'center'
					} }><p>Enter a YouTube video URL.</p><InnerBlocks /></div>
				}
			</div>
		);
	},

	save() {
		return <InnerBlocks.Content />;
	}
} );
