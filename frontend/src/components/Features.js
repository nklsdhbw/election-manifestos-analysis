import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import p2 from '../img/p2.png';

const features = [
  {
    name: 'Die Ähnlichkeitsanalyse',
    description:
      ' zeigt dir, wie ähnlich sich die Parteien in ihren Wahlprogrammen sind.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Die Sentimentanalyse',
    description: 'zeigt dir, wie positiv oder negativ die Parteien in ihrem Wahlprogramm sprechen.',
    icon: LockClosedIcon,
  },
  {
    name: 'Die Top-Wörter-Analyse',
    description: 'zeigt dir, welche Wörter die Parteien am häufigsten verwenden.',
    icon: ServerIcon,
  },
]

export default function Example() {
  return (
    <div className="overflow-hidden bg-white pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Komplexe Analysen zu<span className='text-indigo-600'> Wahlprogrammen.</span></p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              Hier findest du ausführliche Analysen zu den Wahlprogrammen der 6 größten Parteien aus Deutschland.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src={p2}
            alt="Product screenshot"
            className="overflow-hidden w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  )
}
