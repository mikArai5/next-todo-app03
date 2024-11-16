import TodoApp from "./components/TodoApp";
export default function Home() {

  return (
    <div className="mt-10 mb-10">
      <main className="">
        <div>
          <section className="flex justify-center items-center h-screen">
            <TodoApp />
          </section>
        </div>
      </main>
    </div>
  );
}
