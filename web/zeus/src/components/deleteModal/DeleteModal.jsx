import Modal from "react-modal";
import {format} from "date-fns";
import {ptBR} from "date-fns/locale";

function DeleteModal(props){
    const customModalStyles = {
        content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '30rem',
            height: '10rem',
            backgroundColor: '#F5E7CC',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)',
            padding: '20px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            opacity: 1,
            transition: 'opacity 0.3s ease-in-out'
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    };

    return(
        <div id={"delete-modal"}>
            <Modal isOpen={props.showDeleteModal} onRequestClose={props.handleCancelDeleteModal} style={customModalStyles}>
                <p>Tem certeza que deseja deletar a ração {props.name} do dia  {format(new Date(props.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} ?</p>
                <div>
                    <button onClick={props.handleDeleteCard}>Sim</button>
                    <button onClick={props.handleCancelDeleteModal}>Cancelar</button>
                </div>
            </Modal>
        </div>
    )
}

export default DeleteModal