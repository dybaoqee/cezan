import React  from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ResumePreviewLink extends React.Component {
	state = {
		resume: null
	};

	componentWillMount() {
	    const { resume_id } = this.props.params;
	    this.setState({ resume_id });
	    firebase.firestore().doc('/resumes/'+resume_id).get().then((snapshot) => {
	    	this.setState({ resume: {...snapshot.data(), resume_id}})
	    })
	}

	render() {
		const { resume } = this.state;
		if(!resume) return null;
		return (
			<div className="resume-preview-link-container">
				<Link to={resume.published ? ('/r/'+resume.link) : ('/preview/'+resume.resume_id)} target="_blank"><span className="resume-url-muted">www.cezan.co/r/</span><span className="resume-url-active">{resume.link}</span></Link>
			</div>
		);
	}
}

export default connect()(ResumePreviewLink);
