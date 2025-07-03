export default async function edit(id:String) {
    
try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`,{
        method: 'path'
    })
} catch (error) {
    
}
    
}