import SoftTitle from "./components/title";

const SoftEngineComponents = (vars, key, value) => {
    
    const getComponent = () => {
        switch (key) {
            case 'TITLE':
                return <SoftTitle key={key} value={value} vars={vars} />;
            default:
                return <></>;
        }
    }
    
    return getComponent();
}

export default SoftEngineComponents;