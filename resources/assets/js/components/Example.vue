<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">Lista de Posts</div>

                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-6 col-md-4" v-for="post in computedPosts">
                                <div class="thumbnail">
                                    <img alt="100%x200" data-src="holder.js/100%x200" style="height: 200px; width: 100%; display: block;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTU5YTA5MzUyOTIgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTlhMDkzNTI5MiI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44MDQ2ODc1IiB5PSIxMDUuMSI+MjQyeDIwMDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==" data-holder-rendered="true">
                                    <div class="caption">
                                        <h3 v-text="post.title" v-if="!post.edit"></h3>
                                        <p v-text="post.description" v-if="!post.edit"></p>
                                        <div class="form-group" v-if="post.edit">
                                            <label for="title">Título</label>
                                            <input type="email" class="form-control" v-model="post.title" id="title" placeholder="Titulo">
                                        </div> 
                                        <div class="form-group" v-if="post.edit">
                                            <textarea class="form-control" rows="3" v-model="post.description"></textarea>
                                        </div>
                                        <p>
                                            <button class="btn btn-primary" :disabled="post.edit" type="button" @click="post.edit = true">Editar</button>
                                            <button class="btn btn-success" :disabled="!post.edit" @click="save(post)" type="button">Guardar</button>
                                            <button class="btn btn-warning" v-show="post.edit" @click="post.edit = false" type="button">Cancelar</button>
                                            <button class="btn btn-danger" @click="confirmOperation(post)"  v-show="!post.edit" type="button">Eliminar</button>

                                        </p>
                                    </div>
                                </div> 
                            </div>
                             <div class="col-sm-6 col-md-4">
                                <div class="thumbnail">
                                    <img alt="100%x200" data-src="holder.js/100%x200" style="height: 200px; width: 100%; display: block;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTU5YTA5MzUyOTIgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTlhMDkzNTI5MiI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44MDQ2ODc1IiB5PSIxMDUuMSI+MjQyeDIwMDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==" data-holder-rendered="true">
                                    <div class="caption">
                                        <div class="form-group">
                                            <label for="title">Título</label>
                                            <input type="email" class="form-control" v-model="post.title" id="title" placeholder="Titulo">
                                        </div> 
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt maxime praesentium explicabo vitae voluptas! Dolores perferendis nihil minima labore id, vel atque. Eligendi distinctio optio debitis laboriosam autem alias aliquid!</p>
                                        
                                        <p>
                                            <button class="btn btn-success" @click="create" type="button">Crear</button>
                                        </p>
                                    </div>
                                </div> 
                            </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PostService from '../services/PostService.js';
    let Post = new PostService();
    export default {
        data(){
            return {
                posts : [],
                is_editing : false,
                post : {
                    title : '',
                    description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus voluptates, distinctio debitis possimus repudiandae iusto quis ipsum impedit rerum nostrum laborum nulla et nisi neque quibusdam, necessitatibus. Nulla laboriosam, officiis?',
                    user_id : 1
                }
            }
        },
        mounted() {
            console.log('Component ready.');
            this.getList();
        },
        methods : {
            getList(){
                let posts = Post.get();
                let vm = this;
                posts.then(posts =>{
                    vm.posts = posts.data.map(post =>{
                        post.edit = post.deleted = false;
                        return post;
                    });
                }).catch(error =>{
                    console.log(error);
                })
            },
            save(post){
                var request = Post.update(post.id, post);
                request.then(post =>{
                    alert("Post actualizado!");
                    post.edit = false;
                }).catch(error=>{
                    console.log(error);
                });
            },
            delete(id){
                var request = Post.delete(id);
                var vm = this;
                request.then(response =>{
                    alert("Eliminado");
                    vm.removePostFromList(id);
                }).catch(error =>{
                    alert("Hubo un error :(");
                });
            },
            create(){
                var post = this.post;
                if(post.title == '' || !post.title)
                {
                    return ;
                }

                var vm = this;
                var request = Post.create(post);
                request.then(new_post =>{
                    new_post.edit = false;
                    vm.posts.push(new_post);
                }).catch(error =>{
                    alert("Hubo un error :(");
                });
            },
            resetInput(){
                this.model.title = '';
            },
            removePostFromList(id){
                var index = this.posts.map(post => post.id).indexOf(id);
                if(index > -1){
                    this.posts[index].deleted = true;
                }
            },
            confirmOperation(post){
                if (confirm('¿Estás seguro?')) {
                    this.delete(post.id);
                } else {
                    console.log("Ok no lo elimaré");
                }
            }
        },
        computed : {
            computedPosts(){
                return this.posts.filter(post => !post.deleted);
            }
        }
    }
</script>
