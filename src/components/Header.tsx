import { useContract } from '../context/Contract';
import {TweetBox} from '../components';

export const Header = ({ setPendingTweets }: IHeader) => {
    const { account: { address, connect, changeAccount }, error } = useContract();

    return <>
        { error && <i className="error">{error}</i> }
        {address
            ? <TweetBox address={address} changeAccount={changeAccount}
                setPendingTweets={setPendingTweets} />
            : <div style={{ margin: "10px 0px" }}>
                <button disabled={Boolean(error)} onClick={() => connect()}>Connect</button>
            </div>}
    </>
}