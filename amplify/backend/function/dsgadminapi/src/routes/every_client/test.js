<html><head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Do something</title>
    <!-- Required Stylesheets -->
    <link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap@4.1.3/dist/css/bootstrap.min.css">
    <link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css">

    <!-- Required scripts -->
    <script src="https://unpkg.com/vue@2.7.10/dist/vue.js"></script>
    <script src="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script>
<meta><meta><meta><meta></head>
<body style="overflow-wrap: break-word;" onfocusout="parent.setEmailRange();">
    <div id="app">Loading...</div>
    <script id="appTemplate" type="text/template">
        <b-card>
            <h2>Session Report</h2>
            <b-table-simple>
                <b-thead>
                    <b-tr>
                        <b-th></b-th>
                        <b-th>Start</b-th>
                        <b-th>End</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr>
                        <b-th>Mood</b-th>
                        <b-td>{{mood(entity.mood_start)}}</b-td>
                        <b-td>{{mood(entity.mood_end)}}</b-td>
                    </b-tr>
                    <b-tr>
                        <b-th>Behaviour</b-th>
                        <b-td>{{behaviour(entity.behaviour_start)}}</b-td>
                        <b-td>{{behaviour(entity.behaviour_end)}}</b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple>
            <b-card v-for="(activity,index) in entity2" :key="`activity+${index}`">
                <h5>Activity {{index + 1}} - {{activity.name}} ({{acttype(activity.type)}})</h5>
                <div v-if="activity.type == 3 || activity.type == 4">
                <b-table-simple>
                    <b-thead>
                        <b-tr>
                            <b-th></b-th>
                            <b-th>Beginning of Session</b-th>
                            <b-th>End of Session</b-th>
                        </b-tr>
                    </b-thead>
                    <b-tbody>
                        <b-tr>
                            <b-th>Facial Expression</b-th>
                            <b-td>{{nfacial(activity.facialBegin)}}</b-td>
                            <b-td>{{nfacial(activity.facialEnd)}}</b-td>
                        </b-tr>
                        <b-tr>
                            <b-th>Eye Contact</b-th>
                            <b-td>{{neeye(activity.eyeContactBegin)}}</b-td>
                            <b-td>{{neeye(activity.eyeContactEnd)}}</b-td>
                        </b-tr>
                        <b-tr>
                            <b-th>Interest in Communication</b-th>
                            <b-td>{{ninterest(activity.interestBegin)}}</b-td>
                            <b-td>{{ninterest(activity.interestEnd)}}</b-td>
                        </b-tr>
                        <b-tr>
                            <b-th>Body Posture</b-th>
                            <b-td>{{nbody(activity.postureBegin)}}</b-td>
                            <b-td>{{nbody(activity.postureEnd)}}</b-td>
                        </b-tr>
                        <b-tr>
                            <b-th>Mood</b-th>
                            <b-td>{{mood(activity.moodBegin)}}</b-td>
                            <b-td>{{mood(activity.moodEnd)}}</b-td>
                        </b-tr>
                        <b-tr>
                            <b-th>Behaviour</b-th>
                            <b-td>{{behaviour(activity.behaviourBegin)}}</b-td>
                            <b-td>{{behaviour(activity.behaviourEnd)}}</b-td>
                        </b-tr>
                        <b-tr>
                            <b-th>Activity remarks</b-th>
                            <b-td>{{activity.remarks}}</b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
                </div>
                <div v-else>
                <b-table-simple>
                    <b-tbody>
                        <b-tr>
                            <b-th>Attention Span</b-th>
                            <b-td>{{attention(activity.attentionspan)}}</b-td>
                        </b-tr>
                        <b-tr>
                            <b-th>Behaviour</b-th>
                            <b-td>{{behaviour(activity.behaviour)}}</b-td>
                        </b-tr>
                        <b-tr>
                            <b-th>Level Of Alertness</b-th>
                            <b-td>{{alertness(activity.levelofalertness)}}</b-td>
                        </b-tr>
                        <b-tr>
                            <b-th>Mood</b-th>
                            <b-td>{{mood(activity.mood)}}</b-td>
                        </b-tr>
                        <b-tr>
                            <b-th>Participation</b-th>
                            <b-td>{{participation(activity.participation)}}</b-td>
                        </b-tr>
                        <b-tr>
                            <b-th>Thoughts</b-th>
                            <b-td>{{thought(activity.thoughts)}}</b-td>
                        </b-tr>
                        <b-tr>
                            <b-th>Activity remarks</b-th>
                            <b-td>{{activity.remarks}}</b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
            </div>
            </b-card>      
        </b-card>
    </script>
    <script>
        let transformData = raw =>{
            if(!raw){
                return null;
            }
            return {
                mood_start:raw.crb5c_mood,
                mood_end:raw.crb5c_mood_end,
                behaviour_start:raw.crb5c_behaviour,
                behaviour_end:raw.crb5c_behaviour_end,                              
            }
        }

        let transformData2 = raw =>{
            if(!raw?.length){
                return null;
            }

            
            return raw.map(i => {
                return {
                    name:i.crb5c_name,
                    type:i.crb5c_physitype,
                    remarks: i.crb5c_addremarks,
                    attentionspan: i.crb5c_attentionspan,
                    behaviour: i.crb5c_behaviour,
                    levelofalertness:i.crb5c_levelofalertness,
                    mood:i.crb5c_mood,
                    participation:i.crb5c_participation,
                    thoughts:i.crb5c_thoughts,
                    facialBegin: i.crb5c_namastebeginfacialexpression,
                    eyeContactBegin: i.crb5c_namastebegineyecontact,
                    interestBegin: i.crb5c_namastebegininterestincommunicating,
                    postureBegin: i.crb5c_namastebeginbodyposture,
                    behaviourBegin: i.crb5c_namastebeginbehaviour,
                    moodBegin:i.crb5c_namastebeginmood,       
                    facialEnd: i.crb5c_namasteendfacialexpression,
                    eyeContactEnd: i.crb5c_namasteendeyecontact,
                    interestEnd: i.crb5c_namasteendinterestincommunicating,
                    postureEnd: i.crb5c_namasteendbodyposture,
                    behaviourEnd: i.crb5c_namasteendbehaviour,
                    moodEnd: i.crb5c_namasteendmood,                                
                }
            })
        }

        window.addEventListener("load", async ()=>{

           let entityId = window.top.Xrm.Page.data.entity.getId();
           console.log('ID:',entityId)

           let entityLogicalName = "crb5c_fow_session_report";
           let options = new URLSearchParams({
            $select:'crb5c_fow_session_reportid,crb5c_mood,crb5c_mood_end,crb5c_behaviour,crb5c_behaviour_end',
            $filter:`_crb5c_session_value eq '${entityId}'`,
           });

           let entity2LogicalName = "crb5c_fowsessionactivity";
           let options2 = new URLSearchParams({  
            $select:'crb5c_fowsessionactivityid,crb5c_name,crb5c_physitype,crb5c_addremarks,crb5c_attentionspan,crb5c_behaviour,crb5c_levelofalertness,crb5c_mood,crb5c_participation,crb5c_thoughts,crb5c_namastebeginfacialexpression,crb5c_namastebegineyecontact,crb5c_namastebegininterestincommunicating,crb5c_namastebeginbodyposture,crb5c_namastebeginbehaviour,crb5c_namastebeginmood,crb5c_namasteendfacialexpression,crb5c_namasteendeyecontact,crb5c_namasteendinterestincommunicating,crb5c_namasteendbodyposture,crb5c_namasteendbehaviour,crb5c_namasteendmood',
            $filter:`_crb5c_sessionattendance_value eq '${entityId}'`,
            });

           let {entities} = await window.top.Xrm.WebApi.retrieveMultipleRecords(entityLogicalName, '?'+options.toString());
           let entity = transformData(entities[0]);
           //console.log('entity:',entity)
           //console.log('entities',entities)
            
           let {entities: entities2} = await window.top.Xrm.WebApi.retrieveMultipleRecords(entity2LogicalName, '?'+options2.toString());
           this.entity2 = transformData2(entities2);
           console.log(this.entity2);
           //console.log('entity',entity2)
           //console.log('entities2',entities2)
           

           const app = new Vue({
            el: "#app",
            template:"#appTemplate",
            data(){
                return {
                    entity,
                    entity2
                }
            },
            methods:{
                acttype(val){
                        switch(val){
                            case 0: return 'Physical';
                            case 1: return 'Psychosocio';
                            case 2: return 'Cognitive';
                            case 3: return 'Namaste Care';
                            case 4: return 'Individual';
                        }
                },
                attention(val){
                    let arr= val.split(',');

                    return arr.map(v=>{
                        switch(v){
                            case '0': return 'Good (>30 min)';
                            case '1': return 'Fair (15-30 min)';
                            case '2': return 'Poor (<15 min)';
                        }
                    }).join(', ');
                },
                alertness(val){
                    let arr= val.split(',');
                    return arr.map(v=>{
                        switch(v){
                            case '0': return 'Alert';
                            case '1': return 'Lethargic';
                            case '2': return 'Fluctuating';
                        }
                    }).join(', ');
                },
                mood(val){
                    let arr= val.split(',');

                    return arr.map(v=>{
                        switch(v){
                            case '0': return 'Elated';
                            case '1': return 'Happy';
                            case '2': return 'Neutral';
                            case '3': return 'Irritable';
                            case '4': return 'Angry';
                            case '5': return 'Anxious';
                            case '6': return 'Sad';
                            case '7': return 'Depressed';
                        }
                    }).join(', ');
                },
                behaviour(val){
                    let arr= val.split(',');

                    return arr.map(v=>{
                        switch(v){
                            case '0': return 'Cooperative';
                            case '1': return 'Uncooperative';
                            case '2': return 'Calm';
                            case '3': return 'Restless';
                            case '4': return 'Agitated';
                            case '5': return 'Aggressive';
                        }
                    }).join(', ');
                },
                participation(val){
                    let arr= val.split(',');

                    return arr.map(v=>{
                        switch(v){
                            case '0': return 'Yes';
                            case '1': return 'Sometimes';
                            case '2': return 'Never';
                            
                        }
                    }).join(', ');  
                },
                thought(val){
                    let arr= val.split(',');

                    return arr.map(v=>{
                        switch(v){
                            case '0': return 'Relevant';
                            case '1': return 'Irrelevant';
                            case '2': return 'Inconsistent';
                            case '3': return 'Preoccupied';
                            case '4': return 'Delusional';
                        }
                    }).join(', ');  
                },
                nfacial(val){
                    let arr= val.split(',');

                    return arr.map(v=>{
                        switch(v){
                            case '0': return 'Passive';
                            case '1': return 'Gimmacing';
                            case '2': return 'Frowning';
                            case '3': return 'Frightened';
                            case '4': return 'Smilling';
                        }
                    }).join(', ');  
                },
                neeye(val){
                    let arr= val.split(',');

                    return arr.map(v=>{
                        switch(v){
                            case '0': return 'Closed Eyes';
                            case '1': return 'Looking Away';
                            case '2': return 'Passive';
                            case '3': return 'Blank Look';
                            case '4': return 'Little Eye Contact';
                            case '5': return 'Good Eye Contact';
                        }
                    }).join(', ');  
                },
                ninterest(val){
                    let arr= val.split(',');

                    return arr.map(v=>{
                        switch(v){
                            case '0': return 'Avoiding';
                            case '1': return 'Listening';
                            case '2': return 'Non-verbal Response';
                            case '3': return 'Unclear verbal response';
                            case '4': return 'Clear verbal Response';
                        }
                    }).join(', ');  
                },
                nbody(val){
                    let arr= val.split(',');

                    return arr.map(v=>{
                        switch(v){
                            case '0': return 'Restless';
                            case '1': return 'Tensed';
                            case '2': return 'Slouched';
                            case '3': return 'Relaxed';
                            case '4': return 'Jerky';
                        }
                    }).join(', ');  
                },
            }
        })


        });


    </script>

</body></html>