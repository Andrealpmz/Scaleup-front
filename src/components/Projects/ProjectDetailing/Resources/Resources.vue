<script lang="ts" setup>
    import { onMounted, ref, watch } from 'vue';
    import ToastService from 'primevue/toastservice';
    import SpeedDial from 'primevue/speeddial';
    import { S3Client, PutObjectCommand, PutObjectCommandOutput } from '@aws-sdk/client-s3';
    import { saveResource } from '@src/utils/DB/api';

    import { useQuery } from '@vue/apollo-composable';
    import gql from 'graphql-tag';
    
    import "primeicons/primeicons.css";
    import "primevue/resources/primevue.min.css";
    import "primevue/resources/themes/lara-light-indigo/theme.css";
    
    const awsRegion = import.meta.env.VITE_AWS_REGION;
    const awsAccessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
    const awsSecretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
    
    const toast = ref<any>(null);
    const speedDialOpened = ref(false);
    const fileSelected = ref(false);
    const SpeedDialSelected = ref();
    const maskVisible = ref(false);
    const resourcesArea = ref();
    const proyectoId = 1;

    const s3 = new S3Client({
        region: awsRegion,
        credentials: {
            accessKeyId: awsAccessKeyId || '',
            secretAccessKey: awsSecretAccessKey || '',
        },
    });

    const processFiles = (files: FileList | null) => {
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                uploadFileToS3(files[i]);
            }
            fileSelected.value = true;
        }
    };

    const uploadFileToS3 = async (file: File) => {
        const params = {
            Bucket: 'scaleup-resources',
            Key: file.name,
            Body: file,
        };

        try {
            await s3.send(new PutObjectCommand(params));
            console.log('Archivo subido exitosamente.');
            const bucketUrl = `https://${params.Bucket}.s3.${awsRegion}.amazonaws.com`;
            const fileUrl = `${bucketUrl}/${file.name}`;
            console.log(file.name, fileUrl, proyectoId, 1);

            await saveResource({
                name: file.name,
                file: fileUrl,
                project_id: 1,
                activity_id: 1
            });

        } catch (error) {
            console.error('Error al subir el archivo:', error);
        }
    };

    const items = ref([
        {
            label: 'Device',
            icon: 'pi pi-desktop',
            command: () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '*';
                input.addEventListener('change', (event) => {
                    maskVisible.value = true;
                    const files = (event.target as HTMLInputElement).files;
                    if (files && files.length > 0) {
                        processFiles(files);
                    }
                });
                input.click();
            }
        },
        {
            label: 'Drive',
            icon: 'mdi mdi-google-drive',
            command: () => {
                toast.value.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
            }
        },
        {
            label: 'Link',
            icon: 'pi pi-link',
            command: () => {
                toast.value.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
            }
        }
    ]);

    const handleDragEnter = (event: DragEvent) => {
        event.preventDefault();
        maskVisible.value = true;
    };

    const handleDragLeave = (event: DragEvent) => {
        event.preventDefault();
        maskVisible.value = false;
    };

    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        maskVisible.value = false;
        const files = event.dataTransfer?.files;
        if (files) {
            processFiles(files);
        }
    };

    onMounted(() => {
        toast.value = ToastService;
        resourcesArea.value.addEventListener('dragenter', handleDragEnter);
        resourcesArea.value.addEventListener('dragleave', handleDragLeave);
    });

    const onSpeedDialShow = () => {
        if (fileSelected.value) {
            maskVisible.value = false;
        } else {
            setTimeout(() => {
                speedDialOpened.value = true;
            }, 3000);
        }
        maskVisible.value = true;
    };

    const handleFileUpload = (event: Event) => {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            const selectedFiles: FileList | null = fileInput.files;
            processFiles(selectedFiles);
        }
    };

    const getResourcesByProjectIdQuery = gql`
        query getResourcesByProjectId($projectId: Int!) {
            getAllResources(project_id: $projectId) {
                id
                name
                file
                dateUpload
            }
        }
    `;
    const resources = ref<Array<{ name: string, file: string, dateUpload: string }>>([]);

    const { result: resultResources } = useQuery(getResourcesByProjectIdQuery, { projectId: proyectoId });

    watch(resultResources, (newResult) => {
        if (newResult.data) {
            resources.value = newResult.data.getAllResources || [];
        }
    });
</script>

<template>
    <div class="resources" ref="resourcesArea">
        <h2 class="titleSections">Recursos</h2>
        <div v-if="!fileSelected && maskVisible === true" class="Mask" @drop="handleDrop" @dragover.prevent @dragenter="handleDragEnter" @dragleave="handleDragLeave" @change="handleFileUpload">
            <div class="centerMask">
                <div class="block">
                    <img class="imageUpload" draggable="false" src="@assets/svg/Projects/Upload.svg">
                    <p class="textUpload">Arrastra tus archivos</p>
                </div>
                <input type="file" ref="inputFileRef" style="display: none" accept="image/*" @change="handleFileUpload" />
            </div>
        </div>
        <div class="overflowBox">
            <div class="boxResources">
                <div class="itemResource" v-for="(resource, index) in resources" :key="index">
                    {{ resource.name }}
                </div>
            </div>
        </div>
        <div class="boxButtonUpload">
            <SpeedDial :model="items" v-model="SpeedDialSelected" direction="left" class="menuUpload" @show="onSpeedDialShow"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import url('./resources.scss');
</style>