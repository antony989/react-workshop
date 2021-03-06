import React from 'react';
import {EMAIL_PROP_TYPE} from './constants';

import './EmailView.scss';

const EmailViewButtonBar = ({unread, onDelete, onClose, onMarkUnread, onMarkRead}) => {
    let markUnreadReadButton = unread
        ? (<button onClick={onMarkRead}>Mark Read</button>)
        : (<button onClick={onMarkUnread}>Mark Unread</button>);

    return (
        <div className="email-view__button-bar">
            {markUnreadReadButton}
            <button onClick={onDelete}>Delete</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default class EmailView extends React.Component {
    static propTypes = {
        email: EMAIL_PROP_TYPE.isRequired,
        onClose: React.PropTypes.func.isRequired,
        onDelete: React.PropTypes.func.isRequired,

        onMarkUnread: React.PropTypes.func,
        onMarkRead: React.PropTypes.func
    }

    _handleClose(e) {
        e.stopPropagation();
        this.props.onClose();
    }

    _handleDelete(e) {
        e.stopPropagation();
        this.props.onDelete();
    }

    _handleMarkUnread(e) {
        e.stopPropagation();

        if (this.props.onMarkUnread) {
            this.props.onMarkUnread();
        }
    }

    _handleMarkRead(e) {
        e.stopPropagation();

        if (this.props.onMarkRead) {
            this.props.onMarkRead();
        }
    }

    render() {
        let {
            email: {subject, from, date, message, unread}
        } = this.props;
        let rawMessage = {__html: message};

        return (
            <div className="email-view">
                <h1>{subject}</h1>
                <h2>From: <a href={`mailto:${from}`}>{from}</a></h2>
                <h3>{date}</h3>
                <div dangerouslySetInnerHTML={rawMessage} />
                    <EmailViewButtonBar
                        unread={unread}
                        onClose={this._handleClose.bind(this)}
                        onDelete={this._handleDelete.bind(this)}
                        onMarkUnread={this._handleMarkUnread.bind(this)}
                        onMarkRead={this._handleMarkRead.bind(this)}
                    />
            </div>
        );
    }
}
