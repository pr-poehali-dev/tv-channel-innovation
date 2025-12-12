import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Program {
  id: number;
  title: string;
  time: string;
  category: string;
  duration: string;
  isLive: boolean;
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
  description?: string;
}

interface AdBlock {
  id: number;
  type: 'sponsor' | 'ad';
  title: string;
  company: string;
  image: string;
}

interface AdminPanelProps {
  programs: Program[];
  news: NewsItem[];
  adBlocks: AdBlock[];
  onUpdatePrograms: (programs: Program[]) => void;
  onUpdateNews: (news: NewsItem[]) => void;
  onUpdateAdBlocks: (adBlocks: AdBlock[]) => void;
}

const AdminPanel = ({ programs, news, adBlocks, onUpdatePrograms, onUpdateNews, onUpdateAdBlocks }: AdminPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingAd, setEditingAd] = useState<AdBlock | null>(null);

  const handleAddProgram = (program: Omit<Program, 'id'>) => {
    const newProgram = { ...program, id: Date.now() };
    onUpdatePrograms([...programs, newProgram]);
  };

  const handleUpdateProgram = (updatedProgram: Program) => {
    onUpdatePrograms(programs.map(p => p.id === updatedProgram.id ? updatedProgram : p));
    setEditingProgram(null);
  };

  const handleDeleteProgram = (id: number) => {
    onUpdatePrograms(programs.filter(p => p.id !== id));
  };

  const handleAddNews = (newsItem: Omit<NewsItem, 'id'>) => {
    const newNews = { ...newsItem, id: Date.now() };
    onUpdateNews([...news, newNews]);
  };

  const handleUpdateNews = (updatedNews: NewsItem) => {
    onUpdateNews(news.map(n => n.id === updatedNews.id ? updatedNews : n));
    setEditingNews(null);
  };

  const handleDeleteNews = (id: number) => {
    onUpdateNews(news.filter(n => n.id !== id));
  };

  const handleAddAd = (ad: Omit<AdBlock, 'id'>) => {
    const newAd = { ...ad, id: Date.now() };
    onUpdateAdBlocks([...adBlocks, newAd]);
  };

  const handleUpdateAd = (updatedAd: AdBlock) => {
    onUpdateAdBlocks(adBlocks.map(a => a.id === updatedAd.id ? updatedAd : a));
    setEditingAd(null);
  };

  const handleDeleteAd = (id: number) => {
    onUpdateAdBlocks(adBlocks.filter(a => a.id !== id));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 fixed bottom-6 right-6 z-50 shadow-lg">
          <Icon name="Settings" size={16} />
          Админ-панель
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Управление контентом</DialogTitle>
          <DialogDescription>
            Добавляйте, редактируйте и удаляйте контент телеканала
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="programs" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="programs">Передачи</TabsTrigger>
            <TabsTrigger value="news">Новости</TabsTrigger>
            <TabsTrigger value="ads">Реклама</TabsTrigger>
          </TabsList>

          <TabsContent value="programs" className="space-y-4">
            <ProgramForm onSubmit={handleAddProgram} />
            <div className="space-y-2">
              {programs.map((program) => (
                <Card key={program.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-heading font-semibold">{program.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {program.time} • {program.category} • {program.duration}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => setEditingProgram(program)}>
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteProgram(program.id)}>
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {editingProgram && (
              <Dialog open={!!editingProgram} onOpenChange={() => setEditingProgram(null)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Редактировать передачу</DialogTitle>
                  </DialogHeader>
                  <ProgramForm 
                    initialData={editingProgram} 
                    onSubmit={handleUpdateProgram}
                  />
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            <NewsForm onSubmit={handleAddNews} />
            <div className="space-y-2">
              {news.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-heading font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => setEditingNews(item)}>
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteNews(item.id)}>
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {editingNews && (
              <Dialog open={!!editingNews} onOpenChange={() => setEditingNews(null)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Редактировать новость</DialogTitle>
                  </DialogHeader>
                  <NewsForm 
                    initialData={editingNews} 
                    onSubmit={handleUpdateNews}
                  />
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>

          <TabsContent value="ads" className="space-y-4">
            <AdForm onSubmit={handleAddAd} />
            <div className="space-y-2">
              {adBlocks.map((ad) => (
                <Card key={ad.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge variant="outline" className="mb-2">
                          {ad.type === 'sponsor' ? 'Спонсор' : 'Реклама'}
                        </Badge>
                        <h4 className="font-heading font-semibold">{ad.title}</h4>
                        <p className="text-sm text-muted-foreground">{ad.company}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => setEditingAd(ad)}>
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteAd(ad.id)}>
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {editingAd && (
              <Dialog open={!!editingAd} onOpenChange={() => setEditingAd(null)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Редактировать рекламу</DialogTitle>
                  </DialogHeader>
                  <AdForm 
                    initialData={editingAd} 
                    onSubmit={handleUpdateAd}
                  />
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

const ProgramForm = ({ initialData, onSubmit }: { 
  initialData?: Program; 
  onSubmit: (data: any) => void;
}) => {
  const [formData, setFormData] = useState<Partial<Program>>(initialData || {
    title: '',
    time: '',
    category: '',
    duration: '',
    isLive: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(initialData ? { ...formData, id: initialData.id } : formData);
    if (!initialData) {
      setFormData({ title: '', time: '', category: '', duration: '', isLive: false });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-heading">
            {initialData ? 'Изменить передачу' : 'Добавить передачу'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Название</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="time">Время</Label>
              <Input
                id="time"
                placeholder="08:00"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="duration">Длительность</Label>
              <Input
                id="duration"
                placeholder="2 часа"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="category">Категория</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {initialData ? 'Сохранить' : 'Добавить'}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

const NewsForm = ({ initialData, onSubmit }: { 
  initialData?: NewsItem; 
  onSubmit: (data: any) => void;
}) => {
  const [formData, setFormData] = useState<Partial<NewsItem>>(initialData || {
    title: '',
    date: new Date().toLocaleDateString('ru-RU'),
    image: 'https://cdn.poehali.dev/projects/76073f5c-891a-4d8c-a163-9f4c7069d26c/files/ab7981d9-3782-48ed-9096-ece2037b4d60.jpg',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(initialData ? { ...formData, id: initialData.id } : formData);
    if (!initialData) {
      setFormData({ 
        title: '', 
        date: new Date().toLocaleDateString('ru-RU'), 
        image: 'https://cdn.poehali.dev/projects/76073f5c-891a-4d8c-a163-9f4c7069d26c/files/ab7981d9-3782-48ed-9096-ece2037b4d60.jpg',
        description: '' 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-heading">
            {initialData ? 'Изменить новость' : 'Добавить новость'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="news-title">Заголовок</Label>
            <Input
              id="news-title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="news-date">Дата</Label>
            <Input
              id="news-date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="news-image">URL изображения</Label>
            <Input
              id="news-image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="news-description">Описание (опционально)</Label>
            <Textarea
              id="news-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
          <Button type="submit" className="w-full">
            {initialData ? 'Сохранить' : 'Добавить'}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

const AdForm = ({ initialData, onSubmit }: { 
  initialData?: AdBlock; 
  onSubmit: (data: any) => void;
}) => {
  const [formData, setFormData] = useState<Partial<AdBlock>>(initialData || {
    type: 'ad',
    title: '',
    company: '',
    image: 'https://cdn.poehali.dev/projects/76073f5c-891a-4d8c-a163-9f4c7069d26c/files/ab7981d9-3782-48ed-9096-ece2037b4d60.jpg',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(initialData ? { ...formData, id: initialData.id } : formData);
    if (!initialData) {
      setFormData({ 
        type: 'ad', 
        title: '', 
        company: '', 
        image: 'https://cdn.poehali.dev/projects/76073f5c-891a-4d8c-a163-9f4c7069d26c/files/ab7981d9-3782-48ed-9096-ece2037b4d60.jpg' 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-heading">
            {initialData ? 'Изменить рекламу' : 'Добавить рекламу'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="ad-type">Тип</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value as 'sponsor' | 'ad' })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sponsor">Спонсорский материал</SelectItem>
                <SelectItem value="ad">Реклама</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="ad-title">Заголовок</Label>
            <Input
              id="ad-title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="ad-company">Компания</Label>
            <Input
              id="ad-company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="ad-image">URL изображения</Label>
            <Input
              id="ad-image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {initialData ? 'Сохранить' : 'Добавить'}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default AdminPanel;
