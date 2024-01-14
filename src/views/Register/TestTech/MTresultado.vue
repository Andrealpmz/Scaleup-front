<script lang="ts" setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router';


    async function updateStatus(status : String) {
    try {
        const local_user = localStorage.getItem('userData');
        const obj_local_user = JSON.parse(local_user);
        console.log(obj_local_user);

        const userData = {
            userId: obj_local_user._id,
            form: status,
        };

        // Corrección aquí: eliminado el punto y coma (;) después de JSON.stringify(userData)
        const response = await fetch(import.meta.env.VITE_BACKEND + "/auth/update_form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error("Error en la solicitud:", response.statusText);
            alert("Error en la solicitud");
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        alert("Error en el servidor. Por favor, inténtalo de nuevo.");
    }
}

    const redirect = ref(false);
    const router = useRouter();


    onMounted(() => {
        updateStatus("terminado");
        setTimeout(() => {
        redirect.value = true;
        router.push('/login');
        }, 6000);
        
    })

</script>

<template>
    <nav id="header">
        <img src="@assets/svg/ScaleUp-logo-blanco.svg" draggable="false" class="logo">
    </nav>
    <article id="contentResult">
        <div id="items-left">
            <div class="info">
                <img id="imageResult" draggable="false" src="@assets/svg/TestMaduration/simMTresultado.svg">
            </div>
        </div>
        <div class="items-right">
            <div class="info">
                <div class="alignTextResul">
                    <p id="texto_Result"><span class="titleResult">Gracias por completar nuestro formulario!</span><br><br>
    
                    Estamos entusiasmados de procesar su información y brindarle una excelente experiencia. 
                    Le garantizamos que sus datos están seguros con nosotros y solo se usarán para fines internos.<br><br>
    
                    Gracias nuevamente por confiar en nosotros y nos vemos pronto!.</p>
                </div>
            </div>
        </div>
    </article>
</template>

<style scoped>
    @import url('./test.scss');
</style>