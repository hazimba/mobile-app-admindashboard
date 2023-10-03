<template>
    <div v-if="totalPages() > 0" class="pagination-wrapper">
        <b-button v-if="showPreviousLink()" @click="updatePage(currentPage - 1)" variant="info" size="sm" class="mr-3">Previous Page</b-button>
        {{ currentPage + 1 }} of {{ totalPages() }}
        <b-button v-if="showNextLink()" @click="updatePage(currentPage + 1)" variant="info" size="sm" class="ml-3">Next Page</b-button>
    </div>
</template>

<script>
export default{
    name: 'pagination',
    props: ['schedules', 'currentPage', 'pageSize'], 
    methods: {
        updatePage(pageNumber){
            this.$emit('page:update', pageNumber)
        },
        totalPages(){
            return Math.ceil(this.schedules.length / this.pageSize)
        },
        showPreviousLink(){
            return this.currentPage == 0 ? false : true
        },
        showNextLink(){
            return this.currentPage == (this.totalPages() - 1 ) ? false : true
        }
    }
}

</script>

<style>
.pagination-wrapper{
    cursor: pointer;
    
}
</style>