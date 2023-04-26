import Modal from 'react-modal';
import "./styles.css"

function EditModal(props) {
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
            height: '17rem',
            backgroundColor: '#F5E7CC',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)',
            padding: '20px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            opacity: 1, // torna o modal visível por padrão
            transition: 'opacity 0.3s ease-in-out' // adiciona a transição de fade
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // torna o fundo mais transparente
        },
    };

    return (
        <div id="edit-modal">
            {/* eslint-disable-next-line react/style-prop-object */}
            <Modal isOpen={props.showEditModal} onRequestClose={props.handleCancelEditModal} style={customModalStyles}>
                <h2>Editar compra</h2>
                <label>
                    Nome:
                    <input type="text" value={props.name} onChange={(e) => props.setName(e.target.value)} />
                </label>
                <label>
                    Preço:
                    <input type="text" value={props.price} onChange={(e) => props.setPrice(e.target.value)} />
                </label>
                <label>
                    Peso:
                    <input type="text" value={props.weight} onChange={(e) => props.setWeight(e.target.value)} />
                </label>
                <label>
                    Data:
                    <input type="date" value={props.date} onChange={(e) => props.setDate(e.target.value)} />
                </label>
                <div>
                    <button onClick={props.handleSaveEditModal}>Salvar</button>
                    <button onClick={props.handleCancelEditModal}>Cancelar</button>
                </div>
            </Modal>
        </div>
    );
}

export default EditModal
