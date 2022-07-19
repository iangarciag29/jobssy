const Wrapper = ({children}: any): JSX.Element => {
    return <main className="h-screen overflow-y-auto">
        <div className="container grid px-6 mx-auto">
            {children}
        </div>
    </main>
}

export default Wrapper;