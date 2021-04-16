import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import { AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Intro from './panels/Intro';
import Registration from './panels/Registration';

/*маршруты */
const ROUTES = {
	HOME: 'home', 
	INTRO: 'intro',
	REGISTER: 'register'
}

//storage api - любые значения key-value
//так шо, мы можем хранить все данные для прилки в этом хранилище или нет?
const STORAGE_KEYS = {
	STATUS: 'status'
}

const App = () => {
	const [activePanel, setActivePanel] = useState(ROUTES.REGISTER); //[состояние, хук]
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [userHasSeenIntro, setUserHasSeenIntro] = useState(false);
	const [snackbar, setSnackbar] = useState(false);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const storageData = await bridge.send('VKWebAppStorageGet', {//https://vk.com/dev/vkbridge/vkwebappstorageget
				keys: Object.keys(STORAGE_KEYS)
			});
			await bridge.send('VKWebAppStorageSet', {"key": "atata", "value": "blahbla"});
			await bridge.send('VKWebAppStorageSet', {"key": "bloblo", "value": "ololo"});
			// console.log(typeof storageData);
			const data = {};
			storageData.keys.forEach((key, value) => {
				try {
					data[key] = value?? {};
					switch(key){
						case STORAGE_KEYS.STATUS:
							if(data[key].hasSeenIntro){
								setActivePanel(ROUTES.HOME);
								setUserHasSeenIntro(true);
							}
							break;
						default:
							break;
					}
				} catch (error) {
					console.log(error);
				}
			});
			setUser(user);
			setPopout(null);
			
		}
		fetchData();
	}, []);

	const get = async function(){
		const request  = await fetch('https://jsonplaceholder.typicode.com/todos/1');
		if(request.status == 200){
			const result = await request.json();
			console.log(result);
		}
	}
	const test = async function(){
		const request = await fetch('http://ullungmai2.temp.swtest.ru/');
		if(request.status == 200){
			const result = await request.text();
			console.log(result);
		}
	}
	const go = (e) => {
		setActivePanel(e.currentTarget.dataset.to);
	};
	const viewIntro = async function(){
		try {
			await bridge.send('VkWebAppStorageSet', {//https://vk.com/dev/vkbridge/vkwebappstorageset
				key: STORAGE_KEYS.STATUS,
				value: JSON.stringify({hasSeenIntro: true})
			});
			const allData = await bridge.send('VKWebAppStorageGetKeys', {count: 10});//https://vk.com/dev/vkbridge/vkwebappstoragegetkeys
			console.log(allData);
			// go(ROUTES.HOME);
		} catch (error) {
			console.log('Проблемка с получением данных')
		}
	}

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel} popout={popout}>
					<Home id={ROUTES.HOME} fetchedUser={fetchedUser} go={go} get={test}  />
					<Intro id={ROUTES.INTRO} fetchedUser={fetchedUser} go={go} userHasSeenIntro={userHasSeenIntro}/>
					<Registration id={ROUTES.REGISTER} go={go} userHasSeenIntro={userHasSeenIntro}/>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;

