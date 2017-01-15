@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">
                    <posts-list></posts-list>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
