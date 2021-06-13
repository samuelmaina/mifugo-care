import React from 'react';
import * as utils from '../../../utils';
import * as Styled from '../../../components';

export const SubmitFiles = (props) => {
	const payload = props.payload;

	return (
		<React.Fragment>
			<Styled.P>
				Upload your Resume <span>*</span>
			</Styled.P>
			<Styled.Card>
				<Styled.RFileInput
					type='file'
					name='resume'
					accept='.doc, .docx'
					onChange={(e) =>
						utils.monitorAFileInput(
							e,
							props.setPayload,
							payload,
							utils.maxFileSize.resume
						)
					}
				/>
			</Styled.Card>
			<Styled.P>
				Upload your Certifications <span>*</span>
			</Styled.P>
			<Styled.Card>
				<Styled.RFileInput
					multiple
					type='file'
					name='certifications'
					accept='.doc, .docx'
					onChange={(e) =>
						utils.monitorFilesInput(
							e,
							props.setPayload,
							payload,
							utils.maxFileSize.certifications,
							10
						)
					}
				/>
			</Styled.Card>
			<Styled.P>Profile Picture</Styled.P>
			<Styled.Card>
				<Styled.RFileInput
					type='file'
					name='profile'
					accept='.jpeg, .jpg'
					onChange={(e) =>
						utils.monitorAFileInput(
							e,
							props.setPayload,
							payload,
							utils.maxFileSize.images
						)
					}
				/>
			</Styled.Card>
		</React.Fragment>
	);
};
