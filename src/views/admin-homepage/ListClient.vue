<template lang="pug">
b-container(style="border: 1px solid black; border-radius: 20px; background-color: rgba(100, 94, 94, 0.2); height: 90%")
    b-modal(id="client-status" title="Sorting Active or Inactive Member")
        template
            b-col 
                b-form-group(label="Can select more that one : " v-model="selectedStatus")
                    b-form-checkbox-group.mt-3(style="display: flex; flex-direction: column; gap: 0.75rem" v-model="listActiveStatusSelected" :options="activeStatus" :aria-describedby="ariaDescribedby" name="activeStatus") 
        template(#modal-footer)
            div(style="width: 100%; display: flex; justify-content: space-between")
                b-button.px-5(variant="success" style="font-weight: 500" @click="$bvModal.hide('client-status')") OK
                b-button.px-4(variant="danger" style="font-weight: 500" @click="$bvModal.hide('client-status')") Close
    
    b-modal(:id="modal.modalClientId" title="Client Details Information")
        template#modal-title
            b-row.my-1(v-for="client in modal.data" :key="client.id")
                b-col.mx-3(style="font-weight: 600; font-size: 1.25rem") List of Assessment 
                    b-row.mt-2(v-for="assessmentDetail in client.assessmentDetails" :key="assessmentDetail.assessmentCode")
                        b-button.mx-3(variant="outline-primary" size="sm" :href="assessmentDetail.redirectTo" target="_blank") {{ assessmentDetail.assessmentCode }} - {{ assessmentDetail.assessmentDate }}
                    div.mx-0.mt-2(style="font-weight: 400" v-if="client.clientAssessment.length === 0") No Assessment found for {{ client.clientName }}
            b-row.my-1(v-for="client in modal.data" :key="client.id")
                b-col.mx-3.mt-3(style="font-weight: 600; font-size: 1.25rem") List of Care Giver 
                    b-col
                        b-row(v-for="caregiver in client.clientCaregiver" :key="caregiver")
                            li(style="font-weight: 400") {{ caregiver }}
                    div.mx-0.mt-2(style="font-weight: 400" v-if="client.clientCaregiver.length === 0") No Care Giver found for {{ client.clientName }}
            
            b-row.mt-4(v-for="client in modal.data" :key="client.id")
                b-col.mx-3
                    b-row.mt-4 
                        b-button.mx-1(style="background-color: inherit; color: blue; border: none; font-size: small" :href="client.clientLink" target="_blank") To Client Page - Click Here
        template(#modal-footer)
            div(style="width: 100%; display: flex; justify-content: end")
                b-button.px-4(variant="danger" style="font-weight: 500" @click="hideModal") Close
    b-col.mt-5
        b-row.mb-3
            b-col.col-8(style="")
                h4.d-flex.justify-content-start.align-items-center List of Clients
            b-col.col-4(style="d-flex justify-content-center align-items-center")
                b-row(class="" style="height: 1%; margin-right: 0.1rem;")
                  b-col.col-12(class="d-flex align-items-center" style="position: relative;")
                    BIconSearch(style="position: absolute; left: 30px")
                    b-input(class="pr-1 pl-5 border border-dark d-flex justify-content-center align-items-center" style="border-radius: 20px; font-size: 0.75rem" placeholder="Search Name" type="text" v-model="inputSearchItemList")
            
        b-col(style="text-align: center;")
            b-row.py-3(style="display: flex; align-items: center; justify-content: center; background-color: #50276D; color: white; font-weight: 400; font-size: medium; width: 102.2%")
                b-col(cols="4" style="font-size: 0.85rem") Name
                b-col(cols="2" class="d-flex justify-content-center align-items-center")
                    b-button(style="background-color: inherit; border: none; font-size: 0.85rem" @click="$bvModal.show('client-status')") Status
                        b-icon.mx-1(font-scale="0.9" icon="filter")
                b-col(cols="2" style="font-size: 0.85rem") Last Active
                b-col(cols="2" style="font-size: 0.85rem") Programme
                b-col(cols="2" style="font-size: 0.85rem") Action

        b-col(class="table__body" style="")
            b-row.py-2(v-for="(client, index) in clientsList" :key="index" style="border: 1px solid black; display: flex; align-items: center; background-color: white")
                b-col(cols="4")
                    b-button(style="border: 0px; background-color: inherit; color: blue; font-size: medium; font-size: 0.85rem" @click="openModal(client.id)") {{ client.clientName }}
                b-col(cols="2" style="font-size: 0.85rem") {{ client.clientActiveStatus }}
                b-col(cols="2" style="font-size: 0.85rem") {{ client.clientLastActive }}
                b-col(cols="2" style="font-size: 0.85rem") {{ client.clientProgramme }}
                b-col(cols="2")
                    b-button.p-1(variant="info" style="border: none; font-size: 0.85rem" size="sm" :href="clients[0].assessmentLink" target="_blank") Assessment
</template>
    
<script>
export default {
    data() {
        return {
            inputSearchItemList: '',
            clients: [
                { 
                    id: 1, 
                    clientName: "Alli Rani DO K R Thangavelu", 
                    clientActiveStatus: "Inactive",
                    clientLastActive: "13 / 7 / 2023", 
                    clientProgramme: "FOW", 
                    clientAssessment: ["Assessment 1 - 22 / 2 / 2023", "Assessment 2 - 6 / 7 / 2023"], 
                    assessmentDetails: [
                        {
                            assessmentCode: "ASSESSMENT 1036",
                            assessmentDate: "6/7/2023",
                            redirectTo: "https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fowassessmentform&id=6db2496a-0805-ee11-8f6e-002248ebf4f9"
                        },
                        {
                            assessmentCode: "ASSESSMENT 1024",
                            assessmentDate: "9/12/2023",
                            redirectTo: "https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fowassessmentform&id=d6c6726d-c11f-ee11-9966-000d3a85d4cd"
                        }
                    ],
                    clientCaregiver: ['James', 'Yu Yu Mon'],
                    assessmentLink: "https://fow-assessment-test.npo.sg/home#code=0.AVYAFoBnWo2QZEeY_-NxdaI82LPtCXNub71GvyMMOy010i1UAHY.AgABAAIAAAAtyolDObpQQ5VtlI4uGjEPAgDs_wUA9P91okljipAhv3-aUQ7IJcUnCCeTOqu5BKVx8YQ95SvqZKOpI-2i6U9VNTOZRg6E0eSppN_TwXg3ZLbVqQL8DJOvyDC5rJnzfA95V4zOOeB7f0Xzzzwl4tJt4Rxg_5CYqNWJ5OlEb3EkkuT35n9Y7vJqbdPCla0MozJ72pPi6gx-78qnEeuhczPQU-yRP7jYsmAaSA-TH-KIz0-BEruWwMIOB1zpEx7vs0dWLN1_lZXjwWp_8qr5A1uiXIWq84Vfrm6_xmgy9nPwVkEA2YNPlDERf-LRwz9xsXPCLw6tgG6kBcBnRQE3bxsXC1JxMDLE-F6zh8A3wHo7BZGE2myUUiJ-ANJ-0vhLVcyrIAIfYZ1jfugObnk0EagkNdU5ueLo1ceyTgPzi-yLUQFgCi1pXN0RjGKzGtrA9o722rYhFbo7y9aGndt1rBxDYkM6P3LUlAZiZoA5L0K2VN01J7mZ9yPkJpC7XwEOtoUkl_kfVMdMnYjYTz3StiwmdXoQlp6fFX9_VtBbtmR3forJS1ETNR-Gk5IuUx0Dwk0S9CWn6vtx9rXxkai7-jmKOOPA6CpAk60kqIQdG5DHm9EYST21YMM4Ksb25aniCW4NLXLWV9_kmVsub0N5RzHf4ssk5tgkrd1DmzC2NNfhnDoU5OEB0G1pwN5D29XYFvUH4YEcxzb__VkJcWt-PQsq0FzpD30X5wJ623-41YHD0Iiwnct4omU40JrICxOo56KKIRcYlTxesr7QI1geY5PY58u5LtHgdvxtTlW1j09Ewt0L45AVunQM0w-Yt9w3sEgu86pF-A_zdQCXgRA7lDAJE3grn2iuu16_iob2vUUUV3HJWT6MaJf28Uw_KfogHpMUcWXlIUT5L-YZqvAgT4Xu5Fs&client_info=eyJ1aWQiOiI5YzE4Yzc2Ny0zNmJmLTQyZjAtOWU2ZS0yMmRlZTJhNGUzMTIiLCJ1dGlkIjoiNWE2NzgwMTYtOTA4ZC00NzY0LTk4ZmYtZTM3MTc1YTIzY2Q4In0&state=eyJpZCI6ImQ1ODc0ODgyLThjNDAtNGYxOS04MGY5LTEwZDlkODVmOWMyOSIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3d%7c%7b9DD18AD0-E27E-ED11-81AC-000D3A85CB45%7d&session_state=6ca1d363-61cd-4ad9-9a81-63a0e04d5d1c",
                    clientLink: "https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_customer&id=9dd18ad0-e27e-ed11-81ac-000d3a85cb45"
                },
                { 
                    id: 2, 
                    clientName: "Ang Boy Koh", 
                    clientActiveStatus: "Active",  
                    clientLastActive: "11 / 7 / 2023", 
                    clientProgramme: "CIP", 
                    clientAssessment: [],
                    clientCaregiver: [],
                    assessmentDetails: [],
                    clientLink: "https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_customer&id=381c6469-331a-ee11-8f6d-002248ecdc58" 
                },
                { 
                    id: 3, 
                    clientName: "Chan Keng Howe Harry", 
                    clientActiveStatus: "Active", 
                    clientLastActive: "13 / 7 / 2023", 
                    clientProgramme: "FOW", 
                    clientAssessment: ["Assessment 1 - 19 / 12 / 2022"],
                    clientCaregiver: ['Janice', 'Jinky', 'Phylis'],
                    assessmentDetails: [
                        {
                            assessmentCode: "ASSESSMENT 1036",
                            assessmentDate: "6/7/2023",
                            redirectTo: "https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fowassessmentform&id=6db2496a-0805-ee11-8f6e-002248ebf4f9"
                        },
                    ],
                    clientLink: "https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_customer&id=a3d18ad0-e27e-ed11-81ac-000d3a85cb45"
                },
                { 
                    id: 4, 
                    clientName: "Chan Maggie", 
                    clientActiveStatus: "Active",
                    clientLastActive: "13 / 7 / 2023", 
                    clientProgramme: "FOW", 
                    clientAssessment: ["Assessment 1 - 22 / 2 / 2023", "Assessment 2 - 6 / 7 / 2023"], 
                    assessmentDetails: [
                        {
                            assessmentCode: "ASSESSMENT 1036",
                            assessmentDate: "6/7/2023",
                            redirectTo: "https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fowassessmentform&id=6db2496a-0805-ee11-8f6e-002248ebf4f9"
                        },
                    ],
                    clientCaregiver: ['Marlene'],
                    assessmentLink: "https://fow-assessment-test.npo.sg/home#code=0.AVYAFoBnWo2QZEeY_-NxdaI82LPtCXNub71GvyMMOy010i1UAHY.AgABAAIAAAAtyolDObpQQ5VtlI4uGjEPAgDs_wUA9P91okljipAhv3-aUQ7IJcUnCCeTOqu5BKVx8YQ95SvqZKOpI-2i6U9VNTOZRg6E0eSppN_TwXg3ZLbVqQL8DJOvyDC5rJnzfA95V4zOOeB7f0Xzzzwl4tJt4Rxg_5CYqNWJ5OlEb3EkkuT35n9Y7vJqbdPCla0MozJ72pPi6gx-78qnEeuhczPQU-yRP7jYsmAaSA-TH-KIz0-BEruWwMIOB1zpEx7vs0dWLN1_lZXjwWp_8qr5A1uiXIWq84Vfrm6_xmgy9nPwVkEA2YNPlDERf-LRwz9xsXPCLw6tgG6kBcBnRQE3bxsXC1JxMDLE-F6zh8A3wHo7BZGE2myUUiJ-ANJ-0vhLVcyrIAIfYZ1jfugObnk0EagkNdU5ueLo1ceyTgPzi-yLUQFgCi1pXN0RjGKzGtrA9o722rYhFbo7y9aGndt1rBxDYkM6P3LUlAZiZoA5L0K2VN01J7mZ9yPkJpC7XwEOtoUkl_kfVMdMnYjYTz3StiwmdXoQlp6fFX9_VtBbtmR3forJS1ETNR-Gk5IuUx0Dwk0S9CWn6vtx9rXxkai7-jmKOOPA6CpAk60kqIQdG5DHm9EYST21YMM4Ksb25aniCW4NLXLWV9_kmVsub0N5RzHf4ssk5tgkrd1DmzC2NNfhnDoU5OEB0G1pwN5D29XYFvUH4YEcxzb__VkJcWt-PQsq0FzpD30X5wJ623-41YHD0Iiwnct4omU40JrICxOo56KKIRcYlTxesr7QI1geY5PY58u5LtHgdvxtTlW1j09Ewt0L45AVunQM0w-Yt9w3sEgu86pF-A_zdQCXgRA7lDAJE3grn2iuu16_iob2vUUUV3HJWT6MaJf28Uw_KfogHpMUcWXlIUT5L-YZqvAgT4Xu5Fs&client_info=eyJ1aWQiOiI5YzE4Yzc2Ny0zNmJmLTQyZjAtOWU2ZS0yMmRlZTJhNGUzMTIiLCJ1dGlkIjoiNWE2NzgwMTYtOTA4ZC00NzY0LTk4ZmYtZTM3MTc1YTIzY2Q4In0&state=eyJpZCI6ImQ1ODc0ODgyLThjNDAtNGYxOS04MGY5LTEwZDlkODVmOWMyOSIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3d%7c%7b9DD18AD0-E27E-ED11-81AC-000D3A85CB45%7d&session_state=6ca1d363-61cd-4ad9-9a81-63a0e04d5d1c",
                    clientLink: "https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_customer&id=a7d18ad0-e27e-ed11-81ac-000d3a85cb45"
                },
                { 
                    id: 5, 
                    clientName: "Dorothy Soh Pheck Ha", 
                    clientActiveStatus: "Active",
                    clientLastActive: "13 / 7 / 2023", 
                    clientProgramme: "FOW", 
                    clientAssessment: ["Assessment 1 - 22 / 2 / 2023", "Assessment 2 - 6 / 7 / 2023"], 
                    assessmentDetails: [
                        {
                            assessmentCode: "ASSESSMENT 1036",
                            assessmentDate: "6/7/2023",
                            redirectTo: "https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fowassessmentform&id=6db2496a-0805-ee11-8f6e-002248ebf4f9"
                        },
                    ],
                    clientCaregiver: ['Marlene'],
                    assessmentLink: "https://fow-assessment-test.npo.sg/home#code=0.AVYAFoBnWo2QZEeY_-NxdaI82LPtCXNub71GvyMMOy010i1UAHY.AgABAAIAAAAtyolDObpQQ5VtlI4uGjEPAgDs_wUA9P91okljipAhv3-aUQ7IJcUnCCeTOqu5BKVx8YQ95SvqZKOpI-2i6U9VNTOZRg6E0eSppN_TwXg3ZLbVqQL8DJOvyDC5rJnzfA95V4zOOeB7f0Xzzzwl4tJt4Rxg_5CYqNWJ5OlEb3EkkuT35n9Y7vJqbdPCla0MozJ72pPi6gx-78qnEeuhczPQU-yRP7jYsmAaSA-TH-KIz0-BEruWwMIOB1zpEx7vs0dWLN1_lZXjwWp_8qr5A1uiXIWq84Vfrm6_xmgy9nPwVkEA2YNPlDERf-LRwz9xsXPCLw6tgG6kBcBnRQE3bxsXC1JxMDLE-F6zh8A3wHo7BZGE2myUUiJ-ANJ-0vhLVcyrIAIfYZ1jfugObnk0EagkNdU5ueLo1ceyTgPzi-yLUQFgCi1pXN0RjGKzGtrA9o722rYhFbo7y9aGndt1rBxDYkM6P3LUlAZiZoA5L0K2VN01J7mZ9yPkJpC7XwEOtoUkl_kfVMdMnYjYTz3StiwmdXoQlp6fFX9_VtBbtmR3forJS1ETNR-Gk5IuUx0Dwk0S9CWn6vtx9rXxkai7-jmKOOPA6CpAk60kqIQdG5DHm9EYST21YMM4Ksb25aniCW4NLXLWV9_kmVsub0N5RzHf4ssk5tgkrd1DmzC2NNfhnDoU5OEB0G1pwN5D29XYFvUH4YEcxzb__VkJcWt-PQsq0FzpD30X5wJ623-41YHD0Iiwnct4omU40JrICxOo56KKIRcYlTxesr7QI1geY5PY58u5LtHgdvxtTlW1j09Ewt0L45AVunQM0w-Yt9w3sEgu86pF-A_zdQCXgRA7lDAJE3grn2iuu16_iob2vUUUV3HJWT6MaJf28Uw_KfogHpMUcWXlIUT5L-YZqvAgT4Xu5Fs&client_info=eyJ1aWQiOiI5YzE4Yzc2Ny0zNmJmLTQyZjAtOWU2ZS0yMmRlZTJhNGUzMTIiLCJ1dGlkIjoiNWE2NzgwMTYtOTA4ZC00NzY0LTk4ZmYtZTM3MTc1YTIzY2Q4In0&state=eyJpZCI6ImQ1ODc0ODgyLThjNDAtNGYxOS04MGY5LTEwZDlkODVmOWMyOSIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3d%7c%7b9DD18AD0-E27E-ED11-81AC-000D3A85CB45%7d&session_state=6ca1d363-61cd-4ad9-9a81-63a0e04d5d1c",
                    clientLink: "https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_customer&id=a7d18ad0-e27e-ed11-81ac-000d3a85cb45"
                },
                { 
                    id: 6, 
                    clientName: "Ee Hoe Lee", 
                    clientActiveStatus: "Inactive",
                    clientLastActive: "13 / 7 / 2023", 
                    clientProgramme: "CIP", 
                    clientAssessment: ["Assessment 1 - 22 / 2 / 2023", "Assessment 2 - 6 / 7 / 2023"], 
                    assessmentDetails: [
                        {
                            assessmentCode: "ASSESSMENT 1036",
                            assessmentDate: "6/7/2023",
                            redirectTo: "https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fowassessmentform&id=6db2496a-0805-ee11-8f6e-002248ebf4f9"
                        },
                    ],
                    clientCaregiver: ['Marlene'],
                    assessmentLink: "https://fow-assessment-test.npo.sg/home#code=0.AVYAFoBnWo2QZEeY_-NxdaI82LPtCXNub71GvyMMOy010i1UAHY.AgABAAIAAAAtyolDObpQQ5VtlI4uGjEPAgDs_wUA9P91okljipAhv3-aUQ7IJcUnCCeTOqu5BKVx8YQ95SvqZKOpI-2i6U9VNTOZRg6E0eSppN_TwXg3ZLbVqQL8DJOvyDC5rJnzfA95V4zOOeB7f0Xzzzwl4tJt4Rxg_5CYqNWJ5OlEb3EkkuT35n9Y7vJqbdPCla0MozJ72pPi6gx-78qnEeuhczPQU-yRP7jYsmAaSA-TH-KIz0-BEruWwMIOB1zpEx7vs0dWLN1_lZXjwWp_8qr5A1uiXIWq84Vfrm6_xmgy9nPwVkEA2YNPlDERf-LRwz9xsXPCLw6tgG6kBcBnRQE3bxsXC1JxMDLE-F6zh8A3wHo7BZGE2myUUiJ-ANJ-0vhLVcyrIAIfYZ1jfugObnk0EagkNdU5ueLo1ceyTgPzi-yLUQFgCi1pXN0RjGKzGtrA9o722rYhFbo7y9aGndt1rBxDYkM6P3LUlAZiZoA5L0K2VN01J7mZ9yPkJpC7XwEOtoUkl_kfVMdMnYjYTz3StiwmdXoQlp6fFX9_VtBbtmR3forJS1ETNR-Gk5IuUx0Dwk0S9CWn6vtx9rXxkai7-jmKOOPA6CpAk60kqIQdG5DHm9EYST21YMM4Ksb25aniCW4NLXLWV9_kmVsub0N5RzHf4ssk5tgkrd1DmzC2NNfhnDoU5OEB0G1pwN5D29XYFvUH4YEcxzb__VkJcWt-PQsq0FzpD30X5wJ623-41YHD0Iiwnct4omU40JrICxOo56KKIRcYlTxesr7QI1geY5PY58u5LtHgdvxtTlW1j09Ewt0L45AVunQM0w-Yt9w3sEgu86pF-A_zdQCXgRA7lDAJE3grn2iuu16_iob2vUUUV3HJWT6MaJf28Uw_KfogHpMUcWXlIUT5L-YZqvAgT4Xu5Fs&client_info=eyJ1aWQiOiI5YzE4Yzc2Ny0zNmJmLTQyZjAtOWU2ZS0yMmRlZTJhNGUzMTIiLCJ1dGlkIjoiNWE2NzgwMTYtOTA4ZC00NzY0LTk4ZmYtZTM3MTc1YTIzY2Q4In0&state=eyJpZCI6ImQ1ODc0ODgyLThjNDAtNGYxOS04MGY5LTEwZDlkODVmOWMyOSIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3d%7c%7b9DD18AD0-E27E-ED11-81AC-000D3A85CB45%7d&session_state=6ca1d363-61cd-4ad9-9a81-63a0e04d5d1c",
                    clientLink: "https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_customer&id=a7d18ad0-e27e-ed11-81ac-000d3a85cb45"
                },
                { 
                    id: 7, 
                    clientName: "Kang Ah Hong", 
                    clientActiveStatus: "Inactive",
                    clientLastActive: "13 / 7 / 2023", 
                    clientProgramme: "CIP", 
                    clientAssessment: ["Assessment 1 - 22 / 2 / 2023", "Assessment 2 - 6 / 7 / 2023"], 
                    assessmentDetails: [
                        {
                            assessmentCode: "ASSESSMENT 1036",
                            assessmentDate: "6/7/2023",
                            redirectTo: "https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fowassessmentform&id=6db2496a-0805-ee11-8f6e-002248ebf4f9"
                        },
                    ],
                    clientCaregiver: ['Marlene'],
                    assessmentLink: "https://fow-assessment-test.npo.sg/home#code=0.AVYAFoBnWo2QZEeY_-NxdaI82LPtCXNub71GvyMMOy010i1UAHY.AgABAAIAAAAtyolDObpQQ5VtlI4uGjEPAgDs_wUA9P91okljipAhv3-aUQ7IJcUnCCeTOqu5BKVx8YQ95SvqZKOpI-2i6U9VNTOZRg6E0eSppN_TwXg3ZLbVqQL8DJOvyDC5rJnzfA95V4zOOeB7f0Xzzzwl4tJt4Rxg_5CYqNWJ5OlEb3EkkuT35n9Y7vJqbdPCla0MozJ72pPi6gx-78qnEeuhczPQU-yRP7jYsmAaSA-TH-KIz0-BEruWwMIOB1zpEx7vs0dWLN1_lZXjwWp_8qr5A1uiXIWq84Vfrm6_xmgy9nPwVkEA2YNPlDERf-LRwz9xsXPCLw6tgG6kBcBnRQE3bxsXC1JxMDLE-F6zh8A3wHo7BZGE2myUUiJ-ANJ-0vhLVcyrIAIfYZ1jfugObnk0EagkNdU5ueLo1ceyTgPzi-yLUQFgCi1pXN0RjGKzGtrA9o722rYhFbo7y9aGndt1rBxDYkM6P3LUlAZiZoA5L0K2VN01J7mZ9yPkJpC7XwEOtoUkl_kfVMdMnYjYTz3StiwmdXoQlp6fFX9_VtBbtmR3forJS1ETNR-Gk5IuUx0Dwk0S9CWn6vtx9rXxkai7-jmKOOPA6CpAk60kqIQdG5DHm9EYST21YMM4Ksb25aniCW4NLXLWV9_kmVsub0N5RzHf4ssk5tgkrd1DmzC2NNfhnDoU5OEB0G1pwN5D29XYFvUH4YEcxzb__VkJcWt-PQsq0FzpD30X5wJ623-41YHD0Iiwnct4omU40JrICxOo56KKIRcYlTxesr7QI1geY5PY58u5LtHgdvxtTlW1j09Ewt0L45AVunQM0w-Yt9w3sEgu86pF-A_zdQCXgRA7lDAJE3grn2iuu16_iob2vUUUV3HJWT6MaJf28Uw_KfogHpMUcWXlIUT5L-YZqvAgT4Xu5Fs&client_info=eyJ1aWQiOiI5YzE4Yzc2Ny0zNmJmLTQyZjAtOWU2ZS0yMmRlZTJhNGUzMTIiLCJ1dGlkIjoiNWE2NzgwMTYtOTA4ZC00NzY0LTk4ZmYtZTM3MTc1YTIzY2Q4In0&state=eyJpZCI6ImQ1ODc0ODgyLThjNDAtNGYxOS04MGY5LTEwZDlkODVmOWMyOSIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3d%7c%7b9DD18AD0-E27E-ED11-81AC-000D3A85CB45%7d&session_state=6ca1d363-61cd-4ad9-9a81-63a0e04d5d1c",
                    clientLink: "https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_customer&id=a7d18ad0-e27e-ed11-81ac-000d3a85cb45"
                },
            ],
            activeStatus: [
                {
                    text: 'Active',
                    value: 'Active'
                },
                {
                    text: 'Inactive',
                    value: 'Inactive'
                }
            ],
            listActiveStatusSelected: [],
            modal: {
                modalClientId: null,
                data: null,
            }
        }
    },
    created() {
        this.listActiveStatusSelected = this.activeStatus.map(option => option.value);
    },
    computed: {
      clientsList(){
        let filteredClients = this.clients

        if(this.listActiveStatusSelected !== 0){
            filteredClients = filteredClients.filter(item => this.listActiveStatusSelected.includes(item.clientActiveStatus))
        }
        if(this.inputSearchItemList.trim().length > 0){
            const clientName = this.inputSearchItemList.trim().toLocaleLowerCase
            return filteredClients = filteredClients.filter(client => client.clientName.toLowerCase().includes(clientName))
        }
        return filteredClients

        // if(this.listActiveStatusSelected !== 0){
        //     const filtered = this.clients.filter(item => this.listActiveStatusSelected.includes(item.clientActiveStatus))
        //     console.log('Result : ', filtered)
        //     return filtered
        // }

        // else if(this.inputSearchItemList.trim().length > 0){
        //   return this.clients.filter((client) => client.clientName.toLocaleLowerCase().includes(this.inputSearchItemList.trim()))
        // }else{
        //   return this.clients
        // }
      }
    },
    methods: {
        backAdminHomepage() {
            this.$router.push({ path: '/adminhomepage' })
        },
        openModal(clientId){
            this.modal.modalClientId = `modal-${clientId}`;
            this.modal.data = this.listModalData(this.modal.modalClientId)
            this.$nextTick(() =>{
                this.$bvModal.show(this.modal.modalClientId);
            })

            console.log("data: ", this.modal.data);

        },
        listModalData(modalClientId){
            const clientId = modalClientId.split("-")[1]

            return this.clients
            .filter(client => client.id === +clientId)
        },
        hideModal(){
            this.$bvModal.hide(this.modal.modalClientId)

            this.modal.modalClientId = null
            this.modal.data = null
        },
        moveToHomePage(){
            this.$router.push({ path: "/" })
        },
    }
}
</script>

<style>
.table__body{
    text-align: center; 
    max-height: 250px; 
    overflow-y: scroll; 
    border-collapse: separate; 
    border-spacing: 0px;
}

.table__body::-webkit-scrollbar{
    width: 0.5rem;
    height: 0.5rem;
}

.table__body::-webkit-scrollbar-thumb{
    border-radius: 0.5rem;
    background-color: #0004;
}
</style>