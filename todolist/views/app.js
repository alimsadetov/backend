const App = {
    data() {
        return {
            notes: [],
            inputName: '',
            inputOpisanie: '',
            inputUsername: ''
        }
    },
    methods: {
        addTask() {
            
            console.log(this.isNotFull())
            if (this.isNotFull()){
                
                return
            }

            else {
                this.notes.push({name: this.inputName, opisanie: this.inputOpisanie})
                let res = `/${this.inputUsername}/${this.inputName}/${this.inputOpisanie}`
                axios.post(res)
                this.inputName='';
                this.inputOpisanie='';
                console.log(this.inputUsername);
                
                console.log('succseed')
                
                
                //console.log(this.notes);
            }

            
        },
        removeTask(index) {
            axios.delete(`/${this.inputUsername}/${this.notes[index].name}/${this.notes[index].opisanie}`);
            this.notes.splice(index, 1)
            
            
        },

        async showTasks() {
            if (this.isUsernameNotFilled()){
                
                return
            }
            else {
                let response = await axios.get(`/get/${this.inputUsername}`);
                //console.log(response.data)
                this.notes = [];
                for (let item of response.data){
                    this.notes.push({
                        name: item.name,
                        opisanie: item.opisanie
                    });
                }
                
            }
        },
        isNotFull() {
            if (this.inputName === '' || this.inputOpisanie === '' || this.inputUsername === ''){
                //console.log(this.inputName, this.inputOpisanie, this.inputUsername);
                return true
            };
            return false;
        },
        isUsernameNotFilled() {
            if (this.inputUsername === ''){
                //console.log(this.inputUsername);
                return true
            };
        }
    }
}

Vue.createApp(App).mount('#app')