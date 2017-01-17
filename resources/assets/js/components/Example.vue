<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">Lista de Posts</div>

                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-6 col-md-4" v-for="post in computedPosts">
                                <div class="thumbnail" v-if="post.id">
                                    <img alt="100%x200" data-src="holder.js/100%x200" style="height: 200px; width: 100%; display: none;" src="" data-holder-rendered="true">
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
                                            <button class="btn btn-success" :disabled="!post.edit" @click="post.save(); post.edit = false;" type="button">Guardar</button>
                                            <button class="btn btn-warning" v-show="post.edit" @click="post.edit = false" type="button">Cancelar</button>
                                            <button class="btn btn-danger" @click="confirmOperation(post)"  v-show="!post.edit" type="button">Eliminar</button>

                                        </p>
                                    </div>
                                </div> 

                                <div class="thumbnail" v-else>
                                    <img alt="100%x200" data-src="holder.js/100%x200" style="height: 200px; width: 100%; display: none;" src="" data-holder-rendered="true">
                                    <div class="caption">
                                        <div class="form-group" >
                                            <label for="title">Título</label>
                                            <input type="email" class="form-control" v-model="post.title" id="title" placeholder="Titulo">
                                        </div> 
                                        <div class="form-group" >
                                            <textarea class="form-control" rows="3" v-model="post.description"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <select v-model="post.user_id" class="form-control">
                                                <option value="">Select an user</option>
                                                <option value="1">Cesar Santana</option>
                                            </select>
                                        </div>
                                        <p>
                                            
                                            <button class="btn btn-success" @click="post.save()" type="button">Guardar</button>

                                        </p>
                                    </div>
                                </div> 
                            </div>
                             <div class=" hide col-sm-6 col-md-4">
                                <div class="thumbnail">
                                    <img alt="100%x200" data-src="holder.js/100%x200" style="height: 200px; width: 100%; display: none;" src="" data-holder-rendered="true">
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
    import PostModel from '../models/PostModel.js';

    export default {
        data(){
            return {
                posts : [],
                is_editing : false,
                post : {
                    title : '',
                    description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus voluptates, distinctio debitis possimus repudiandae iusto quis ipsum impedit rerum nostrum laborum nulla et nisi neque quibusdam, necessitatibus. Nulla laboriosam, officiis?',
                    user_id : 1
                },
            }
        },
        mounted() {
            console.log('Component ready.');
            this.getPosts();
        },
        methods : {
            addNewPost(){
                this.posts.push(new PostModel());
            },
            getPosts(){
                let posts = Post.get();
                let vm = this;
                posts.then(collection =>{
                    vm.posts = collection.data.map(post =>{
                        var _post = new PostModel();
                        _post.fill(post);
                        _post.edit = _post.deleted = false;
                        return _post
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
                    new_post.edit = new_post.deleted = false;
                    vm.posts.push(new_post);
                    vm.resetInput();
                }).catch(error =>{
                    alert("Hubo un error :(");
                });
            },
            resetInput(){
                this.post.title = '';
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
