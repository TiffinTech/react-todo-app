import CSS from './PanelLeft.module.css';

const PanelLeft = ({ children }) => {
    return <div className={`panelLeft ${CSS.panelLeft}`}>{children}</div>;
};

export default PanelLeft;
