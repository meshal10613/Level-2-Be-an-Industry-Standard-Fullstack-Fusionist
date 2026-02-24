export default async function NgosPage() {
	await new Promise((resolve) => setTimeout(resolve, 3000))
	return(
		<div>
			<h1>This is Ngos Page</h1>
		</div>
	)
}