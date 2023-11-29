<script lang="ts" setup>
    import { onMounted, ref, watchEffect } from 'vue';
    import { useMutation, useQuery } from '@vue/apollo-composable';
    import gql from 'graphql-tag';
    import Resources from '@components/Projects/ProjectDetailing/Resources/Resources.vue';
    import typeProject from '@src/utils/interfaces/project';
    // import { create_webhook_jira } from '@src/utils/graphql/mutations/create-webhook';

    const { result } = useQuery(gql`
        query {
            getOneProject(id: 1) {
                id
                name
                type
                areas
                celebration_day
                deadline
                description
                objGeneral
                objSpecifics
                budget
                software
                state
                leader_email
                id_org
            }
        }
    `);

    const project = ref<typeProject>();
    const inputFileRef = ref();

    const openFileInput = () => {
        inputFileRef.value.click(); // Simular clic en el input de tipo file cuando se hace clic en el contenedor
    };

    const handleFileChange = (event: any) => {
        const selectedImage = event.target.files[0];
    };

    watchEffect(async () => {
        if (result.value && result.value.getOneProject) {
            project.value = result.value.getOneProject.map((item: { id: number, name: string }) => ({ name: item.name, id: item.id }));
        }
    });

    onMounted(async () => {
        try {
            const response = await fetch(`https://8bc9-181-53-12-93.ngrok-free.app/user/get-notifications`);
            const data = await response.json();
            console.log('Webhook notification => ', data);
        }catch(error){
            console.log('error webhook notification => ', error);
        }
    })

    const createWebhooks = async () => {
        const token = localStorage.getItem('Token');
        const cloud_id = localStorage.getItem('cloud_id');

        const issueRelatedEventsFilter = {
            "issue-related-events-section": "Project = 'MVP1 Prueba'",
        };
    
        const { mutate: createWebhook } = useMutation(gql`
                mutation createWwebhook($input: CreateWebhookDTO!){
                    createWebhook(input: $input){
                        name
                    }
                }
            `, () => ({
                variables: {
                    input: {
                        name: "Scale-up WebHook",
                        url: "https://bafc-181-53-13-67.ngrok-free.app/user/notifications",
                        events: [
                            "worklog_created",
                            "board_deleted",
                            "option_unassigned_issues_changed",
                            "comment_updated",
                            "attachment_created",
                            "board_configuration_changed",
                            "issue_property_set",
                            "project_deleted",
                            "comment_deleted",
                            "option_issuelinks_changed",
                            "project_updated",
                            "sprint_created",
                            "jira:issue_updated",
                            "project_archived",
                            "issue_property_deleted",
                            "option_voting_changed",
                            "sprint_updated",
                            "comment_created",
                            "option_timetracking_changed",
                            "project_soft_deleted",
                            "option_attachments_changed",
                            "jira:issue_created",
                            "issuelink_deleted",
                            "jira:issue_deleted",
                            "project_restored_deleted",
                            "sprint_deleted",
                            "attachment_deleted",
                            "project_created",
                            "option_watching_changed",
                            "issuelink_created",
                            "board_created",
                            "project_restored_archived",
                            "sprint_closed",
                            "option_timetracking_provider_changed",
                            "sprint_started",
                            "worklog_deleted",
                            "option_subtasks_changed",
                            "worklog_updated",
                            "board_updated"
                        ],
                        filters: JSON.stringify(issueRelatedEventsFilter),
                        excludeBody: false,
                        cloud_id: cloud_id,
                        token: token
                    }
                }
            })
        )

        try {
            const response = await createWebhook();
            console.log('Nuevo webhook: ', response);
        } catch (error) {
            console.error('Error al crear el webhook en jira:', error);
        }
    }
</script>

<template>
    <article id="panel__ProjectDetail">
        <div class="ItemsHead">
            <div class="photo">
                <img draggable="false" class="ProjectImage" src="@assets/images/PWA-images/logo.png">
                <div class="changePhoto" @click="openFileInput">
                    <input type="file" ref="inputFileRef" id="inputFile" accept=".png, .jpeg, .jpg, .webp" @change="handleFileChange">
                    <span>cambiar</span>
                </div>
            </div> 
            <div class="ProjectItems">
                <h2 class="titleProject">{{ project?.name }}Scale Up</h2>
                <p class="typeProject">{{ project?.type }}Gestionado por el equipo</p>
            </div>
        </div>
        <div class="content">
            <div class="sectionLeft">
                <div class="blockItems">
                    <div class="team">
                        <h2 class="titleSections">Equipo</h2>
                    </div>
                    <Resources />
                </div>
            </div>
            <div class="sectionRight">
                <button @click="createWebhooks">Crear un webhook</button>
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped>
    @import url('./ProjectDetailing.scss');
</style>