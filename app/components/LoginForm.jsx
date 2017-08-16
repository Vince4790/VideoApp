var React = require('react');
import * as Redux from 'react-redux';
import * as actions from 'actions';
import firebase from 'app/firebase/';


export var LoginForm = React.createClass({
  render: function(){
    return (
      <div className="container login-form">
        <div className="text-center">
          <h3 style={{color: 'blue', marginBottom: '30px'}}>My VideoApp</h3>
        </div>
    	<div className="row">
			<div className="col-md-6 col-md-offset-3">
				<div className="panel panel-default panel-login">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-6">
								<a href="#" className="active" id="login-form-link">Login</a>
							</div>
							<div className="col-xs-6">
								<a href="#" id="register-form-link">Register</a>
							</div>
						</div>
					</div>

					<div className="panel-body">
						<div className="row">
							<div className="col-lg-12">
								<form id="login-form" role="form">
									<div className="form-group">
										<input type="email" id="login-form-email" tabIndex="1" className="form-control" placeholder="Email Address" required/>
									</div>
									<div className="form-group">
										<input type="password" id="login-form-password" tabIndex="2" className="form-control" placeholder="Password" required/>
									</div>
									<div className="form-group">
										<div className="row">
											<div className="col-sm-6 col-sm-offset-5">
												<input type="submit" id="login-submit" tabIndex="4" className="btn btn-login btn-lg" value="Go"/>
											</div>
										</div>
									</div>
								</form>

								<form id="register-form" role="form" style={{display: 'none'}}>
									<div className="form-group">
										<input type="email" id="register-form-email" tabIndex="1" className="form-control" placeholder="Email Address" required/>
									</div>
									<div className="form-group">
										<input type="password" id="register-form-password" tabIndex="2" className="form-control" placeholder="Password" required/>
									</div>
									<div className="form-group">
										<input type="password" id="register-form-confirm-password" tabIndex="2" className="form-control" placeholder="Confirm Password" required/>
									</div>
									<div className="form-group">
										<div className="row">
											<div className="col-sm-6 col-sm-offset-5">
												<input type="submit" id="register-submit" tabIndex="4" className="btn btn-register" value="Register Now" required/>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    );
}
});

export default Redux.connect()(LoginForm);
