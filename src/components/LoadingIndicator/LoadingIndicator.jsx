import CSS from './LoadingIndicator.module.css';

const LoadingIndicator = ({ running }) => {
    return <div className={`${CSS.loadingIndicator} ${running ? CSS.ldsDualRing : ''}`}></div>;
};

export default LoadingIndicator;
