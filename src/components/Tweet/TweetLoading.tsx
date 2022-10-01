export const TweetLoading = () => {
    return (
        <div className="tweet tweet-loading">
            <div className="loading-box avatar" style={{ display: "inline-block", float: "left", width: "60px", height: "50px", border: "0px" }}></div>
            <div className="content">
                <span className="author">
                    <span className="name">
                        <div className="loading-box" style={{ display: "inline-block", float: "left", margin: "0px 5px 5px 5px", width: "120px", height: 15 }}></div>
                    </span>
                </span>

                <span className="time">
                    <div className="loading-box" style={{ display: "inline-block", float: "left", margin: "0px 5px 5px 5px", width: "30px", height: 15 }}></div>
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