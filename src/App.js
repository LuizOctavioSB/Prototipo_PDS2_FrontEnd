import React, { useState, useEffect } from 'react';
import api from './api';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [mensagens, setMensagens] = useState([]);
    const [formData, setFormData] = useState({
        titulo: '',
        conteudo: '',
        publicada: true
    });

    // Função para buscar mensagens da API
    const fetchMensagens = async () => {
        try {
            const response = await api.get('/mensagens');
            setMensagens(response.data);
        } catch (error) {
            console.error("Erro ao buscar mensagens:", error);
        }
    };

    // Carrega as mensagens ao iniciar
    useEffect(() => {
        fetchMensagens();
    }, []);

    // Atualiza os campos do formulário
    const handleInputChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormData({
            ...formData,
            [event.target.name]: value
        });
    };

    // Enviar nova mensagem para a API
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.post('/criar', formData);
            fetchMensagens();
            setFormData({ titulo: '', conteudo: '', publicada: true });
        } catch (error) {
            console.error("Erro ao criar mensagem:", error);
        }
    };

    return (
        <div>
            <nav className='navbar navbar-dark bg-primary'>
                <div className='container-fluid'>
                    <a className='navbar-brand' href='#'>
                        Mensagens APP
                    </a>
                </div>
            </nav>
            <div className='container mt-3'>
                <form onSubmit={handleFormSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='titulo' className='form-label'>Título</label>
                        <input type='text' className='form-control' id='titulo' name='titulo' onChange={handleInputChange} value={formData.titulo} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='conteudo' className='form-label'>Conteúdo</label>
                        <input type='text' className='form-control' id='conteudo' name='conteudo' onChange={handleInputChange} value={formData.conteudo} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='publicada' className='form-label'>Publicada?</label>
                        <input type='checkbox' id='publicada' name='publicada' onChange={handleInputChange} checked={formData.publicada} />
                    </div>
                    <button type='submit' className='btn btn-primary'>Enviar</button>
                </form>

                <table className='table table-striped table-bordered table-hover mt-4'>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Conteúdo</th>
                            <th>Publicada?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mensagens.map((mensagem) => (
                            <tr key={mensagem.id}>
                                <td>{mensagem.titulo}</td>
                                <td>{mensagem.conteudo}</td>
                                <td>{mensagem.publicada ? 'Sim' : 'Não'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;
