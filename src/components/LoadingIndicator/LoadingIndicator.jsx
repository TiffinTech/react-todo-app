import './styles.css';

const LoadingIndicator = ({ running }) => {
    return <div className={`loading-indicator ${running && 'lds-dual-ring'}`}></div>;
};

export default LoadingIndicator;
