import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck, BlockControls } from '@wordpress/block-editor';
import { Button, Toolbar } from '@wordpress/components';

import './style.scss';
import './editor.scss';

registerBlockType('sc/image-left-text-right', {
	title: 'Image Left Text Right',
	icon: 'button',
	category: 'common',
	attributes: {
		text: {
			type: 'string',
			default: ''
		},
		imageUrl: {
			type: 'string',
			default: ''
		}
	},

	edit: function imageLeftTextRightEdit({ attributes, setAttributes }) {

		const blockProps = useBlockProps();
		
		return(
			<div { ...blockProps }>			
				<SC_ImageLeft attributes={attributes} setAttributes={setAttributes} />
				<SC_TextRight attributes={attributes} setAttributes={setAttributes} />				
			</div>
		);
	},

	save: function imageLeftTextRightSave({ attributes }) {
		return(
			<div class="sc-image-left-text-right-wrapper">
				<div class="sc-il-tr-image">
					{attributes.imageUrl && <img src={attributes.imageUrl} />}
				</div>
				<div class="sc-il-tr-text">
					{ attributes.text }
				</div>
			</div>
		);
	}

});


function SC_ImageLeft({ attributes, setAttributes }) {

	const openMediaLoader = () => {
		const mediaLibrary = wp.media({
			title: "Select Image",
			multiple: false,
			library: { type: "image" },
			button: { text: "Select Image" }
		});	

		mediaLibrary.on("select", () => {
			const media = mediaLibrary.state().get("selection").first().toJSON();
			setAttributes({ imageUrl: media.url });
		});

		mediaLibrary.open();
	};


	const replaceButton = (
		<Toolbar>
			<Button onClick={openMediaLoader}>
				Replace Image
			</Button>
		</Toolbar>
	);

	return (		
		<div class="sc-il-tr-image-wrapper">
			<BlockControls>
				{replaceButton}
			</BlockControls>
			<MediaUpload
				onSelect={ (media) => setAttributes({ imageUrl: media.url }) }
				type="image"
				value={ attributes.imageUrl }
				render={ ({ open }) => (
					<div className="sc-il-tr-image">		
						{/* if image path is defined */}				
			            {attributes.imageUrl && <img src={attributes.imageUrl} />}

			            {/* if image path isn't defined */}
			            {!attributes.imageUrl && (
			              <Button onClick={openMediaLoader}>
			                Select Image
			              </Button>
			            )}
			            
		            </div>
				)}
			/>			
		</div>

	);
}


function SC_TextRight({ attributes, setAttributes }) {
	return (		
		<div className="sc-il-tr-text">
			<RichText
				tagName="div"
				value={attributes.text}
				onChange={ (newText) => setAttributes({ text: newText })}
				placeholder="Enter Text Here"
			/>
		</div>
	);
}
