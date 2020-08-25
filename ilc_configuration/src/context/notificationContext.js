import React, { Component, useState } from "react";
import { clone } from '../utils/clone'
import { statusTemplate } from '../constants/status'
import {NotificationManager} from 'react-notifications';

export const NotificationContext = React.createContext();

export class NotificationProvider extends Component { 
    state = {
        notification: null
    }

    setNotification = (notificationType, message, title = null, timeout = null) => {
        let notification = null
            switch (notificationType) {
              case 'info':
                notification = NotificationManager.info(message);
                break;
              case 'success':
                notification = NotificationManager.success(message, title);
                break;
              case 'warning':
                notification = NotificationManager.warning(message, title, timeout);
                break;
              case 'error':
                notification = NotificationManager.error(message, title, timeout, () => {
                  alert('callback');
                });
                break;
            }
    };

    render() {
        const { children } = this.props;
        const { notification } = this.state;
        const { setNotification } = this;
        return (
            <NotificationContext.Provider
                value = {{
                    notification,
                    setNotification,
                }}
                >
                    {children}
            </NotificationContext.Provider>
        )
    }
}

export default NotificationContext