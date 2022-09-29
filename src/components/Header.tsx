import { useContract } from '../context/Contract';
import {TweetBox} from '../components';

export const Header = ({ setPendingTweets }: IHeader) => {
    const { account: { address, connect, disconnect } } = useContract();
    return <div className="header">
        {address
            ? <TweetBox address={address} disconnect={disconnect}
                setPendingTweets={setPendingTweets} />
            : <div style={{ margin: "10px 0px" }}>
                <button onClick={() => connect()}>Connect</button>
            </div>}
    </div>
}