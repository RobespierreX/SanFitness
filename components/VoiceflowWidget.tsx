import { useEffect } from 'react';

const VoiceflowWidget = () => {
    useEffect(() => {
        // Si ya existe el script de voiceflow, no lo volvemos a inyectar
        const checkVoiceflow = document.getElementById('voiceflow-widget-script');

        if (!checkVoiceflow) {
            const v = document.createElement('script');
            v.id = 'voiceflow-widget-script';
            v.onload = function () {
                // @ts-ignore
                window.voiceflow?.chat?.load({
                    verify: { projectID: '69a4c781ddc4cd94ca01800f' },
                    url: 'https://general-runtime.voiceflow.com',
                    versionID: 'production',
                    voice: {
                        url: "https://runtime-api.voiceflow.com"
                    }
                });
            };
            v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
            v.type = "text/javascript";
            document.body.appendChild(v);
        } else {
            // Si el script ya cargo en el pasado, mostramos de nuevo el chat
            // y si tiene metodo load lo ejecutamos (depende de la implementacion de Voiceflow)
            try {
                // @ts-ignore
                if (window.voiceflow?.chat) {
                    // @ts-ignore
                    window.voiceflow.chat.show?.() || window.voiceflow.chat.open?.();
                }
            } catch (e) { }
        }

        return () => {
            // Ocultar o eliminar el chat al desmontar el componente (cerrar sesion/salir de zona logueada)
            try {
                // @ts-ignore
                if (window.voiceflow?.chat) {
                    // @ts-ignore
                    window.voiceflow.chat.hide?.() || window.voiceflow.chat.close?.();

                    // Ocasionalmente es necesario remover el contenedor principal de Voiceflow 
                    // (suele agregarse un div al final del body) para que no sea visible, 
                    // dependiendo de como funcione la version de Voiceflow
                }
            } catch (e) { }
        };
    }, []);

    return null;
};

export default VoiceflowWidget;
