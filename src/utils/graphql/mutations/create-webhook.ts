import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

export const create_webhook_jira = async (cloud_id: any, token: any) =>  {

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