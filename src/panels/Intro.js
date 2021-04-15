import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {Panel,Group, PanelHeader,PanelHeaderBack, Div,FixedLayout,Button, Avatar} from '@vkontakte/vkui';

import './Intro.css';

const Intro = function(props){ 
	return (
		<Panel id={props.id} centered={true}>
			<PanelHeader>
				Туалетка

			</PanelHeader>
		{(!props.userHasSeenIntro && props.fetchedUser) && 
			<Fragment>
				<Group>
					<div className="User">
						{console.log(JSON.stringify(props.fetchedUser))}
						<Avatar src={props.fetchedUser.photo_200} alt={props.fetchedUser.first_name}/>
						<h2>Привет, {props.fetchedUser.first_name}</h2>
						<h3>About</h3>
						<Div className="info">//можно просто div, но он некрасивый; Div немного стилизованный
							Этот сервис создан для отработки полезных навыкоа пользования пальцами ради написания увеселительнх штук
						</Div>
					</div>
				</Group>
				<FixedLayout vertical="bottom">
					<Div>
						<Button mode="commerce" size="xl" onClick={props.go} data-to='home'>
							Окей, бро
						</Button>
					</Div>
				</FixedLayout>
			</Fragment>
			
		}
		</Panel>
		
	);
}

export default Intro;
