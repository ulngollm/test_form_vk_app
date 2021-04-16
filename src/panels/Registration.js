import React from 'react';
import {Panel, Group, PanelHeader, PanelHeaderBack, Div, FixedLayout, Button, Avatar, FormLayout, FormItem,Input} from '@vkontakte/vkui';
import { func } from 'prop-types';


const Registration = function(props){
    const onSubmit = function(e){
        e.preventDefault();
        console.log(e.target);
    }
    return(
        <Panel id={props.id}>
            <PanelHeader>Регистрация</PanelHeader>
            <Group>
                <Div>
                <FormLayout onSubmit={onSubmit}>
                    <FormItem>
                        <Input type="text" name="text" />
                    </FormItem>
                    <FormItem>
                        <Input type="email" name="email" />
                    </FormItem>
                    <FormItem>
                        <Button size="l" stretched>Зарегистрироваться</Button>
                    </FormItem>

                </FormLayout>
                </Div>
            </Group>
        </Panel>
    );
}

export default Registration;