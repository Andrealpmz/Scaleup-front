<script lang="ts" setup>
    import { ref, defineEmits, defineProps, watchEffect, onMounted, watch } from 'vue';
    import { useQuery } from '@vue/apollo-composable';
    import gql from 'graphql-tag';
    import typeProject from '@src/utils/interfaces/project';
    import { deleteProject } from '@src/utils/DB/api';

    const boolDeletePop = ref(false);

    const emit = defineEmits(['close']);
    const closePopConfirm = () => {
        emit('close', boolDeletePop.value = false);
    };

    const props = defineProps({
        cardId: {
            type: Number,
            required: true,
        },
    });

    const project = ref<typeProject>();

    const { result } = useQuery(gql`
        query getOneProject($id: ID!) {
            getOneProject(id: $id) {
                name
            }
        }
    `, {id: props.cardId});

    watch(result, () => {
        if (result.value && result.value.data && result.value.data.getOneProject) {
            project.value = result.value.data.getOneProject[0];
        }
    });

    const removeProject = () => {
    console.log(props.cardId)
    deleteProject(props.cardId)
        .then(() => {
            closePopConfirm();
        })
        .catch((error) => {
            console.error(error);
        });
    };
</script>

<template>
     <div class="popConfirm">
        <div class="dialog">
            <button @click="closePopConfirm" class="btnCloseDialogMember">
                <img class="btnDelete" draggable="false" src="@assets/svg/close.svg">
            </button>
            <div class="contentDialog">
                <div class="form">
                    <h3>¿Está seguro que desea eliminar el proyecto {{ project?.name }}?</h3>
                    <p>Recuerda que eliminar el proyecto definitivamente es un proceso irreversible.</p>
                    <div class="flexBox">
                        <button @click="closePopConfirm" class="btnGray">Cancelar</button>
                        <button class="btnRed" @click="removeProject">Sí, eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import url('./popConfirm.scss');
</style>
