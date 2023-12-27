<script lang="ts" setup>
    import { reactive, ref, onMounted } from 'vue'
    import gql from 'graphql-tag'
    import { useMutation } from '@vue/apollo-composable'
    import OrgStore from '@src/stores/dataOrganization';
    import { TestObject } from './TestObject';
    import { useRouter } from 'vue-router';

    onMounted(() => {
    updateStatus("terminado");
})


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
    const dataOrg = OrgStore();
    const router = useRouter();
    const organization = reactive({
        nit: '',
        name_org: '',
        type: '',
        name: '',
        last_name: '',
        email: '',
        phone: '',
        country: 1,
        city: 1,
        password: '',
        test: [] as TestObject[]
    })

    const props = defineProps({
        sendTest: {
            type: Array as () => TestObject[],
            required: true,
        },
    });

    organization.nit = dataOrg.nit;
    organization.name_org = dataOrg.name_org;
    organization.type = dataOrg.type;
    organization.name = dataOrg.name;
    organization.last_name = dataOrg.last_name;
    organization.email = dataOrg.email;
    organization.phone = dataOrg.phone;
    organization.country = dataOrg.country;
    organization.city = dataOrg.city;
    organization.password = dataOrg.password;
    organization.test = props.sendTest;

    const { mutate: createOrganization } = useMutation(gql`
        mutation createOrganization($input: createOrganizationDTO!){
            createOrganization(input:$input){
                nit
                name
            }
        }
    `,
    {
        variables: {
            input: organization
        }
    })

    onMounted(() => {
        setTimeout(() => {
            redirect.value = true;
            executeMutation();
            router.push('/CategoriesTest');
            //router.push('/Dashboard');
        }, 6000);
    })

    const executeMutation = async () => {
        try {
            console.log("object reactive sended =>",organization)
            const data = await createOrganization()
            console.log("res insertUser =>", data)
        } catch (err) {
            console.log("error in catched =>", err)
        }
    }

    console.log(organization);
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