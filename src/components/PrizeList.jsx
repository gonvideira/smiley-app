import React from 'react'

function PrizeList() {
    return (
        <>
            <div className="row red lighten-5">

                <h4 className='mt-05'>🎁 Lista de Prémios e Pontos 🎁</h4>

                <div className="container">

                    <div className="card">
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">Prémios de Baixos Pontos</span>
                            <span className="teal-text">[50-100 pontos, resgatáveis a cada poucos dias]</span>
                            <ul>
                                <li>🎬 Noite de cinema com os pais (em casa) – 50 pontos</li>
                                <li>📱 Tempo extra no ecrã (30 minutos) – 60 pontos</li>
                                <li>🍽️ Escolher o jantar para uma noite – 80 pontos</li>
                                <li>🏃‍♀️ Atividade a sós com um dos pais (jogo, passeio) – 100 pontos</li>
                            </ul>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">Prémios de Pontos Médios</span>
                            <span className="teal-text">[200-500 pontos, resgatáveis a cada 1-2 semanas]</span>
                            <ul>
                                <li>🍔 Jantar fora com os pais (barato) – 200 pontos</li>
                                <li>🛏️ Dormida com um amigo em casa – 250 pontos</li>
                                <li>🎡 Excursão de um dia a um parque ou atração local – 300 pontos</li>
                                <li>🎨 Kit de atividades ou trabalhos manuais – 350 pontos</li>
                                <li>🕰️ Ir para a cama mais tarde (30 minutos mais tarde) – 400 pontos</li>
                            </ul>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">Prémios de Pontos Altos</span>
                            <span className="teal-text">[600-1000+ pontos, resgatáveis a cada mês ou mais]</span>
                            <ul>
                                <li>🏖️ Fim de semana fora com os pais – 1000 pontos</li>
                                <li>🍿 Ir ao cinema com pipocas – 600 pontos</li>
                                <li>🦁 Visita a um parque temático ou zoológico – 800 pontos</li>
                                <li>🧸 Um brinquedo ou jogo especial – 900 pontos</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PrizeList