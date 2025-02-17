import { Layout } from "../hocs/Layout"

export const About = () => {
  return <Layout>
    <div className='container mx-auto text-justify p-6 md:p-auto flex flex-col gap-4'>
      <h2 className='text-center font-bold text-xl'>ACERCA DEL PROYECTO DE INVESTIGACIÓN</h2>
      <p>Esta investigación se centra en la optimización del riego en el Vivero Forestal de la Universidad Nacional Amazónica de Madre de Dios, donde actualmente el riego se realiza de manera manual, sin un control preciso de la humedad del sustrato. Esta situación genera un uso ineficiente del agua, pérdida de nutrientes y mayores costos operativos.</p>
      <p>Para abordar esta problemática, el proyecto propone el desarrollo e implementación de un sistema de riego automatizado basado en Internet de las Cosas (IoT). Este sistema permitirá monitorear en tiempo real la humedad del suelo y regular el riego de manera eficiente, optimizando el uso del agua y mejorando el crecimiento y calidad de las plántulas.</p>
      <div className='flex flex-col items-end mb-6'>
        <h3 className='font-bold'>Investigadores :</h3>
        <ul>
          <li>MAMANI MAMANI, Jorge Luis</li>
          <li>SUAQUITA APAZA, Juan Carlos</li>
        </ul>
      </div>
      <div>
        <h3 className='font-bold'>Asesor:</h3>
        <ul>
          <li>MSc. PRIETO LUNA, Jaime Cesar</li>
        </ul>
      </div>
      <div>
        <h3 className='font-bold'>Colaboradores:</h3>
        <ul>
          <li>Vivero forestal de la Universidad Nacional Amazónica de Madre de Dios</li>
        </ul>
      </div>
    </div>
  </Layout>
}
