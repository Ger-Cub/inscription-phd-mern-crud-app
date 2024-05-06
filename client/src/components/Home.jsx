// client/src/components/UserList.js
import React, { useEffect } from 'react';

const Home = () => {

    return (
        <div className='mt-10 flex flex-col mx-auto w-[70%]'>

            <div>
                <h1 className="text-[3rem] font-bold mb-2">Inscription PhD Géologie Numérique</h1>
                <h2 className="text-xl font-bold mb-2">Aprennez l'approche numérique de la géologie de terrain</h2>
                <p>Pour vous inscrire au programme de formation, vous devez fournir vos infromations proposer un projet de recherche.</p>
                <br />
                <div className=''>
                <img className='w-[25rem]' src="https://www.researchgate.net/profile/Remi-Valois/publication/278637347/figure/fig33/AS:332216954572802@1456218102119/Modele-numerique-de-terrain-avec-une-coupe-geologique-du-secteur-central-du-Causse-de.png" alt="" />
                </div>
                <br />
                <p>Pour plus d'information contactez cliquez <a className='text-blue-500' href='https://ger-cub.github.io/portfoliogerard/'>ici.</a></p>
                <br />
                <h1 className="text-[.6rem] font-[200] mb-2">MERN Stack CRUD Application Demostration ©Gerard-Mai/2024</h1>
            </div>

        </div>
    );
};

export default Home;
