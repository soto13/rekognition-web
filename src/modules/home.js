import React, { Component } from "react";
import { AppBars, FooterComponent } from '../components';
import Main from '../routes/routes';
import './home.css';

export default class HomeComponent extends Component {
  render() {
    return (
      <div className='home'>
				<AppBars />
				<div className="container-body">
					<div className='row'>
						<div className='col-xs-12'>
							<Main/>
						</div>
					</div>
				</div>
				<FooterComponent />
			</div>
    )
  }
}