import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import AdminPanel from '@/components/AdminPanel';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [programs, setPrograms] = useState([
    { id: 1, title: 'Утреннее шоу', time: '08:00', category: 'Развлечения', duration: '2 часа', isLive: true },
    { id: 2, title: 'Новости дня', time: '12:00', category: 'Новости', duration: '30 мин', isLive: false },
    { id: 3, title: 'Документальный час', time: '15:00', category: 'Документальное', duration: '1 час', isLive: false },
    { id: 4, title: 'Вечерний эфир', time: '20:00', category: 'Аналитика', duration: '1.5 часа', isLive: false },
  ]);
  const [news, setNews] = useState([
    { id: 1, title: 'Премьера нового сезона "Утреннего шоу"', date: '15 декабря 2025', image: 'https://cdn.poehali.dev/projects/76073f5c-891a-4d8c-a163-9f4c7069d26c/files/ab7981d9-3782-48ed-9096-ece2037b4d60.jpg' },
    { id: 2, title: 'Интервью с министром культуры', date: '14 декабря 2025', image: 'https://cdn.poehali.dev/projects/76073f5c-891a-4d8c-a163-9f4c7069d26c/files/ab7981d9-3782-48ed-9096-ece2037b4d60.jpg' },
    { id: 3, title: 'Специальный репортаж о событиях года', date: '13 декабря 2025', image: 'https://cdn.poehali.dev/projects/76073f5c-891a-4d8c-a163-9f4c7069d26c/files/ab7981d9-3782-48ed-9096-ece2037b4d60.jpg' },
  ]);
  const [adBlocks, setAdBlocks] = useState([
    { id: 1, type: 'sponsor' as const, title: 'Генеральный спонсор', company: 'ООО "Партнёр"', image: 'https://cdn.poehali.dev/projects/76073f5c-891a-4d8c-a163-9f4c7069d26c/files/ab7981d9-3782-48ed-9096-ece2037b4d60.jpg' },
    { id: 2, type: 'ad' as const, title: 'Рекламный блок', company: 'Специальное предложение', image: 'https://cdn.poehali.dev/projects/76073f5c-891a-4d8c-a163-9f4c7069d26c/files/ab7981d9-3782-48ed-9096-ece2037b4d60.jpg' },
  ]);

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'live', label: 'Прямой эфир', icon: 'Radio' },
    { id: 'archive', label: 'Архив передач', icon: 'Archive' },
    { id: 'news', label: 'Новости', icon: 'Newspaper' },
    { id: 'about', label: 'О канале', icon: 'Info' },
    { id: 'contacts', label: 'Контакты', icon: 'Phone' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <Icon name="Tv" size={32} className="text-primary" />
            <span className="text-2xl font-heading font-bold">Телеканал</span>
          </div>
          <nav className="ml-auto flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveSection(item.id)}
                className="gap-2"
              >
                <Icon name={item.icon} size={16} />
                <span className="hidden md:inline">{item.label}</span>
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-8">
        {activeSection === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <section className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 p-8 md:p-12">
              <div className="relative z-10">
                <Badge className="mb-4">В ЭФИРЕ</Badge>
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                  Утреннее шоу
                </h1>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                  Начните день с актуальных новостей, интересными интервью и позитивным настроением
                </p>
                <Button size="lg" className="gap-2">
                  <Icon name="Play" size={20} />
                  Смотреть прямой эфир
                </Button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
                <img 
                  src="https://cdn.poehali.dev/projects/76073f5c-891a-4d8c-a163-9f4c7069d26c/files/ab7981d9-3782-48ed-9096-ece2037b4d60.jpg" 
                  alt="Studio" 
                  className="h-full w-full object-cover"
                />
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-heading font-bold">Расписание передач</h2>
                <Button variant="outline" className="gap-2">
                  <Icon name="Calendar" size={16} />
                  Полное расписание
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {programs.map((program) => (
                  <Card key={program.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant={program.isLive ? 'default' : 'secondary'}>
                          {program.isLive ? 'LIVE' : program.time}
                        </Badge>
                        {program.isLive && (
                          <span className="flex h-3 w-3">
                            <span className="animate-ping absolute h-3 w-3 rounded-full bg-primary opacity-75"></span>
                            <span className="relative rounded-full h-3 w-3 bg-primary"></span>
                          </span>
                        )}
                      </div>
                      <CardTitle className="font-heading">{program.title}</CardTitle>
                      <CardDescription>{program.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          {program.duration}
                        </span>
                        <Button size="sm" variant="ghost" className="gap-1">
                          <Icon name="Info" size={14} />
                          Подробнее
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h2 className="text-3xl font-heading font-bold mb-6">Последние новости</h2>
                <div className="space-y-4">
                  {news.map((item) => (
                    <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-48 h-32 sm:h-auto overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Icon name="Calendar" size={14} />
                                {item.date}
                              </p>
                            </div>
                            <Button size="sm" variant="ghost">
                              <Icon name="ArrowRight" size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-heading font-bold mb-6">Партнёры и реклама</h2>
                <div className="space-y-4">
                  {adBlocks.map((ad) => (
                    <Card key={ad.id} className="overflow-hidden border-2 border-dashed border-muted-foreground/30">
                      <CardHeader>
                        <Badge variant="outline" className="w-fit">
                          {ad.type === 'sponsor' ? 'Спонсорский материал' : 'Реклама'}
                        </Badge>
                        <CardTitle className="text-lg font-heading">{ad.title}</CardTitle>
                        <CardDescription>{ad.company}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-muted rounded overflow-hidden">
                          <img 
                            src={ad.image} 
                            alt={ad.company}
                            className="w-full h-full object-cover opacity-50"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="p-6">
                      <h3 className="font-heading font-semibold mb-2">Рекламируйтесь у нас</h3>
                      <p className="text-sm opacity-90 mb-4">
                        Размещайте рекламу на нашем канале и охватывайте миллионы зрителей
                      </p>
                      <Button variant="secondary" size="sm" className="w-full gap-2">
                        <Icon name="Mail" size={16} />
                        Связаться
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeSection === 'live' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="default" className="text-lg px-4 py-2">
                <span className="flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute h-3 w-3 rounded-full bg-white opacity-75"></span>
                  <span className="relative rounded-full h-3 w-3 bg-white"></span>
                </span>
                В ПРЯМОМ ЭФИРЕ
              </Badge>
            </div>
            <div className="aspect-video bg-secondary rounded-lg overflow-hidden shadow-2xl">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                <div className="text-center space-y-4">
                  <Icon name="Play" size={80} className="mx-auto text-primary" />
                  <h2 className="text-2xl font-heading font-bold">Утреннее шоу</h2>
                  <p className="text-muted-foreground">Прямая трансляция началась в 08:00</p>
                  <Button size="lg" className="gap-2">
                    <Icon name="Play" size={20} />
                    Начать просмотр
                  </Button>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Информация о передаче</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={20} className="text-muted-foreground" />
                  <span>Начало: 08:00, продолжительность: 2 часа</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Tag" size={20} className="text-muted-foreground" />
                  <span>Категория: Развлечения</span>
                </div>
                <p className="text-muted-foreground">
                  Начните свой день вместе с нами! Актуальные новости, интересные гости и позитивное настроение
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'archive' && (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl font-heading font-bold mb-6">Архив передач</h1>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">Все передачи</TabsTrigger>
                <TabsTrigger value="news">Новости</TabsTrigger>
                <TabsTrigger value="entertainment">Развлечения</TabsTrigger>
                <TabsTrigger value="docs">Документальные</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {programs.map((program) => (
                    <Card key={program.id} className="group hover:shadow-lg transition-all duration-300">
                      <div className="aspect-video bg-muted overflow-hidden">
                        <img 
                          src="https://cdn.poehali.dev/projects/76073f5c-891a-4d8c-a163-9f4c7069d26c/files/ab7981d9-3782-48ed-9096-ece2037b4d60.jpg" 
                          alt={program.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <CardHeader>
                        <Badge variant="secondary" className="w-fit mb-2">{program.category}</Badge>
                        <CardTitle className="font-heading">{program.title}</CardTitle>
                        <CardDescription>Эфир от 12 декабря 2025</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full gap-2">
                          <Icon name="Play" size={16} />
                          Смотреть запись
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === 'news' && (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl font-heading font-bold mb-6">Новости телеканала</h1>
            <div className="space-y-4">
              {news.map((item) => (
                <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 p-6 md:p-8">
                      <Badge variant="outline" className="mb-4">{item.date}</Badge>
                      <h2 className="font-heading font-bold text-2xl mb-4 group-hover:text-primary transition-colors">
                        {item.title}
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      <Button variant="outline" className="gap-2">
                        Читать полностью
                        <Icon name="ArrowRight" size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h1 className="text-4xl font-heading font-bold mb-6">О телеканале</h1>
            <Card>
              <CardContent className="p-8 space-y-6">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img 
                    src="https://cdn.poehali.dev/projects/76073f5c-891a-4d8c-a163-9f4c7069d26c/files/ab7981d9-3782-48ed-9096-ece2037b4d60.jpg" 
                    alt="Studio"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg">
                    Наш телеканал — это современная медиаплатформа, которая предлагает качественный и разнообразный контент для широкой аудитории.
                  </p>
                  <p>
                    Мы специализируемся на создании информационных, развлекательных и документальных программ, которые интересны и актуальны для зрителей всех возрастов.
                  </p>
                  <h3 className="font-heading font-bold text-2xl mt-8 mb-4">Наши ценности</h3>
                  <div className="grid md:grid-cols-3 gap-4 not-prose">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Icon name="Target" size={40} className="mx-auto mb-4 text-primary" />
                        <h4 className="font-heading font-semibold mb-2">Качество</h4>
                        <p className="text-sm text-muted-foreground">Высокие стандарты производства</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Icon name="Users" size={40} className="mx-auto mb-4 text-primary" />
                        <h4 className="font-heading font-semibold mb-2">Зрители</h4>
                        <p className="text-sm text-muted-foreground">Ориентация на аудиторию</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Icon name="Lightbulb" size={40} className="mx-auto mb-4 text-primary" />
                        <h4 className="font-heading font-semibold mb-2">Инновации</h4>
                        <p className="text-sm text-muted-foreground">Современные технологии</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h1 className="text-4xl font-heading font-bold mb-6">Контакты</h1>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <Icon name="Building" size={24} />
                    Адрес редакции
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>г. Москва, ул. Примерная, д. 123</p>
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size={20} className="text-primary" />
                    <span>+7 (495) 123-45-67</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Mail" size={20} className="text-primary" />
                    <span>info@telekanal.ru</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <Icon name="MessageSquare" size={24} />
                    Обратная связь
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Свяжитесь с нами по вопросам сотрудничества, рекламы или предложений
                  </p>
                  <Button className="w-full gap-2">
                    <Icon name="Send" size={16} />
                    Отправить сообщение
                  </Button>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <Icon name="Share2" size={24} />
                    Мы в социальных сетях
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Button variant="outline" size="lg">
                      <Icon name="Youtube" size={24} />
                    </Button>
                    <Button variant="outline" size="lg">
                      <Icon name="Facebook" size={24} />
                    </Button>
                    <Button variant="outline" size="lg">
                      <Icon name="Twitter" size={24} />
                    </Button>
                    <Button variant="outline" size="lg">
                      <Icon name="Instagram" size={24} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t mt-16 py-8 bg-secondary/20">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Tv" size={28} className="text-primary" />
                <span className="text-xl font-heading font-bold">Телеканал</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Качественное телевидение для всей семьи
              </p>
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-4">Разделы</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Главная</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Прямой эфир</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Архив передач</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-4">Информация</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">О канале</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Реклама</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Вакансии</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">+7 (495) 123-45-67</li>
                <li className="text-muted-foreground">info@telekanal.ru</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 Телеканал. Все права защищены.
          </div>
        </div>
      </footer>

      <AdminPanel
        programs={programs}
        news={news}
        adBlocks={adBlocks}
        onUpdatePrograms={setPrograms}
        onUpdateNews={setNews}
        onUpdateAdBlocks={setAdBlocks}
      />
    </div>
  );
};

export default Index;