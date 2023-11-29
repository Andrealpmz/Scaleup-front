<script lang="ts" setup>
    import { ref, computed, onMounted } from 'vue';
    import NewProject from '@components/Projects/NewProject/Wizard1/NewProject.vue';
    import Objectives from '@components/Projects/NewProject/Wizard2/Objectives.vue';
    import ChoiceTeam from '@components/Projects/NewProject/Wizard3/ChoiceTeam.vue';
    import projectManagement from '@components/Projects/NewProject/Wizard4/projectManagement.vue';

    const wizardStep = ref(1);
    const progress = ref(0);
    const circumference = 2 * Math.PI * 45;
    const strokeDashOffset = computed(() => circumference * (100 - progress.value) / 100);

    function updateWizardStep(step: number) {
        wizardStep.value = step;
        progress.value = wizardStep.value * 25;
    }

    onMounted(() => {
        setInterval(() => {
            if (progress.value < 100) {
                progress.value = wizardStep.value * 25;
            }
        }, 100);
    });
</script>

<template>
    <div class="progress-circle">
        <svg class="progress-circle__svg" viewBox="0 0 100 100">
            <circle class="progress-circle__background" cx="50" cy="50" r="45"></circle>
            <circle :class="{'completed' : progress === 100}" class="progress-circle__fill" :stroke-dasharray="circumference" :stroke-dashoffset="strokeDashOffset" cx="50" cy="50" r="45"></circle>
            <path v-if="progress === 100" class="checkmark" d="M31.5 51.5l9 8.5L69.5 36" />
        </svg>
    </div>
    <NewProject @step-actual="updateWizardStep" v-if="wizardStep === 1"/>
    <Objectives @step-actual="updateWizardStep" v-if="wizardStep === 2"/>
    <ChoiceTeam @step-actual="updateWizardStep" v-if="wizardStep === 3"/>
    <projectManagement @step-actual="updateWizardStep" v-if="wizardStep === 4"/>
</template>

<style lang="scss" scoped>
    @import url('@components/Projects/NewProject/NewProject.scss');
</style>