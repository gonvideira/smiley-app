import React from 'react'

function PrizeList() {
    return (
        <>
            <div className="row red lighten-5">

                <h4 className='section'>🎁 Lista de Prémios e Pontos 🎁</h4>

                <div className="container">

                    <div className="card">
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">Prémios de Baixos Pontos</span>
                            <strong><span className="teal-text strong">500 pontos</span></strong>
                            <ul>
                                <li>🎬 Noite de cinema com os pais (em casa)</li>
                                <li>📱 Tempo extra no ecrã (30 minutos)</li>
                                <li>🍽️ Escolher o jantar para uma noite</li>
                                <li>🏃‍♀️ Atividade a sós com um dos pais</li>
                            </ul>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">Prémios de Pontos Médios</span>
                            <strong><span className="teal-text">1500 pontos</span></strong>
                            <ul>
                                <li>🍔 Jantar fora com os pais</li>
                                <li>🛏️ Dormida com uma amiga em casa</li>
                                <li>🎡 Excursão de um dia a um parque ou atração local</li>
                                <li>🎨 Kit de atividades ou trabalhos manuais</li>
                            </ul>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">Prémios de Pontos Altos</span>
                            <strong><span className="teal-text">3000 pontos</span></strong>
                            <ul>
                                <li>🏖️ Fim de semana fora com os pais</li>
                                <li>🍿 Ir ao cinema com pipocas</li>
                                <li>🦁 Visita a um parque temático ou zoológico</li>
                                <li>🧸 Um brinquedo ou jogo especial</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PrizeList