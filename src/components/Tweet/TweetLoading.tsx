export const TweetLoading = () => {
    return (
        <div className="tweet">
            {/* <img src="https://avatar.tonies.de/static/stage/01.png" className="avatar" alt="avatar" /> */}
            <div className="content">
                <span className="author">
                    <span className="name">
                        <div className="loading-box" style={{ display: "inline-block", float: "left", margin: "10px 5px", width: "120px", height: 10 }}></div>
                    </span>
                </span>

                {/* TODO: implement x time ago text  */}
                <span className="time">
                    <div className="loading-box" style={{ display: "inline-block", float: "left", margin: "10px 5px", width: "30px", height: 10 }}></div>
                </span>
                <div className="message">
                    <div className="loading-box" style={{ margin: "10px 5px", width: "90%", height: 15 }}></div>
                    <div className="loading-box" style={{ margin: "10px 5px", width: "40%", height: 15 }}></div>
                </div>
                <div className="buttons">
                    <span className="button">
                        <i className="fa fa-reply reply-button" />
                    </span>
                    {/* <i className="fa fa-retweet retweet-button" /> */}
                    <span className="button">
                        <i className="fa fa-heart like-button" />
                    </span>
                    <i className="fa fa-ellipsis-h more-options-button" />
                </div>
            </div>
        </div>
    );
}