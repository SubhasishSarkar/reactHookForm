import "./App.css";
import Form from "./Form";
import ConfirmDialogProvider from 'react-confirm-window'

function App() {
    return (
        <>
            <ConfirmDialogProvider>
                <h1>React Hook Form</h1>
                <Form />
            </ConfirmDialogProvider>
        </>
    );
}

export default App;
