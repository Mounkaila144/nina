'use client';

import { useState } from 'react';
import { CalendarToday, AccessTime, Person, Spa, Edit, Delete, Add, CheckCircle, Cancel, Today, Schedule } from '@mui/icons-material';

interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  service: string;
  employee: string;
  date: string;
  time: string;
  duration: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  price: number;
  room?: string;
}

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedView, setSelectedView] = useState('list'); // 'list' or 'calendar'

  // Données de démonstration
  const appointments: Appointment[] = [
    {
      id: 'RDV001',
      clientName: 'Mariame Ila',
      clientPhone: '06 12 34 56 78',
      clientEmail: 'marie.dubois@email.com',
      service: 'Massage relaxant 60min',
      employee: 'Moubarack Ali',
      date: '2024-01-22',
      time: '09:00',
      duration: 60,
      status: 'confirmed',
      notes: 'Première visite, allergique aux huiles d\'amande',
      price: 80.00,
      room: 'Salle 1'
    },
    {
      id: 'RDV002',
      clientName: 'Pierre Laurent',
      clientPhone: '06 23 45 67 89',
      clientEmail: 'pierre.laurent@email.com',
      service: 'Soin visage purifiant',
      employee: 'Isabelle Moreau',
      date: '2024-01-22',
      time: '10:30',
      duration: 45,
      status: 'pending',
      price: 65.00,
      room: 'Salle 2'
    },
    {
      id: 'RDV003',
      clientName: 'Julie Leroy',
      clientPhone: '06 34 56 78 90',
      clientEmail: 'julie.leroy@email.com',
      service: 'Massage deep tissue 90min',
      employee: 'Thomas Leroy',
      date: '2024-01-22',
      time: '14:00',
      duration: 90,
      status: 'confirmed',
      notes: 'Douleurs cervicales',
      price: 120.00,
      room: 'Salle 3'
    },
    {
      id: 'RDV004',
      clientName: 'Anne Dupont',
      clientPhone: '06 45 67 89 01',
      clientEmail: 'anne.dupont@email.com',
      service: 'Pédicure relaxante',
      employee: 'Moubarack Ali',
      date: '2024-01-22',
      time: '16:00',
      duration: 45,
      status: 'completed',
      price: 50.00,
      room: 'Salle 4'
    },
    {
      id: 'RDV005',
      clientName: 'Marc Rousseau',
      clientPhone: '06 56 78 90 12',
      clientEmail: 'marc.rousseau@email.com',
      service: 'Massage aux pierres chaudes',
      employee: 'Isabelle Moreau',
      date: '2024-01-23',
      time: '11:00',
      duration: 75,
      status: 'cancelled',
      notes: 'Annulé par le client - report demandé',
      price: 95.00,
      room: 'Salle 1'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no_show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'pending': return 'En attente';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      case 'no_show': return 'Absent';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Schedule className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <Cancel className="h-4 w-4" />;
      case 'no_show': return <Cancel className="h-4 w-4" />;
      default: return <Schedule className="h-4 w-4" />;
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesDate = !selectedDate || appointment.date === selectedDate;
    const matchesStatus = selectedStatus === 'all' || appointment.status === selectedStatus;
    return matchesDate && matchesStatus;
  });

  const todayAppointments = appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]);
  const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed').length;
  const totalRevenue = appointments.filter(apt => apt.status === 'completed').reduce((sum, apt) => sum + apt.price, 0);
  const completionRate = appointments.length > 0 ? (appointments.filter(apt => apt.status === 'completed').length / appointments.length * 100) : 0;

  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <CalendarToday className="mr-3 text-violet-400" />
            Rendez-vous
          </h1>
          <p className="text-gray-400 mt-2">Gestion du planning et des réservations</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setSelectedView(selectedView === 'list' ? 'calendar' : 'list')}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white hover:bg-gray-600 transition-colors"
          >
            {selectedView === 'list' ? 'Vue Calendrier' : 'Vue Liste'}
          </button>
          <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors">
            <Add className="mr-2" />
            Nouveau RDV
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Aujourd'hui</p>
              <p className="text-2xl font-bold text-white">{todayAppointments.length}</p>
            </div>
            <div className="p-3 bg-blue-600 rounded-lg">
              <Today className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Confirmés</p>
              <p className="text-2xl font-bold text-white">{confirmedAppointments}</p>
            </div>
            <div className="p-3 bg-green-600 rounded-lg">
              <CheckCircle className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">CA réalisé</p>
              <p className="text-2xl font-bold text-white">{totalRevenue.toFixed(2)} €</p>
            </div>
            <div className="p-3 bg-violet-600 rounded-lg">
              <Spa className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Taux réalisation</p>
              <p className="text-2xl font-bold text-white">{completionRate.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-orange-600 rounded-lg">
              <Schedule className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Statut</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="confirmed">Confirmé</option>
              <option value="pending">En attente</option>
              <option value="completed">Terminé</option>
              <option value="cancelled">Annulé</option>
              <option value="no_show">Absent</option>
            </select>
          </div>
        </div>
      </div>

      {selectedView === 'list' ? (
        /* Vue Liste */
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">RDV</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Client</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Service</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Employé</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Date/Heure</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Durée</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Prix</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Statut</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-750 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <span className="font-medium text-white">{appointment.id}</span>
                        {appointment.room && (
                          <div className="text-sm text-gray-400">{appointment.room}</div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <span className="text-white font-medium">{appointment.clientName}</span>
                        <div className="text-sm text-gray-400">{appointment.clientPhone}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-300">{appointment.service}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-violet-600 rounded-full flex items-center justify-center mr-2">
                          <Person className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-300">{appointment.employee}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="flex items-center text-white">
                          <CalendarToday className="h-4 w-4 mr-1 text-gray-400" />
                          {new Date(appointment.date).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center text-gray-400 text-sm mt-1">
                          <AccessTime className="h-4 w-4 mr-1" />
                          {appointment.time}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-300">{appointment.duration}min</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-green-400">{appointment.price.toFixed(2)} €</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                        <span className="ml-1">{getStatusLabel(appointment.status)}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button className="text-violet-400 hover:text-violet-300 transition-colors">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button className="text-red-400 hover:text-red-300 transition-colors">
                          <Delete className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAppointments.length === 0 && (
            <div className="text-center py-12">
              <CalendarToday className="mx-auto h-12 w-12 text-gray-500 mb-4" />
              <p className="text-gray-400">Aucun rendez-vous trouvé pour cette période</p>
            </div>
          )}
        </div>
      ) : (
        /* Vue Calendrier simplifiée */
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-6">Planning du {new Date(selectedDate).toLocaleDateString('fr-FR')}</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Créneaux horaires */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Créneaux disponibles</h4>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {getTimeSlots().map((time) => {
                  const appointmentAtTime = filteredAppointments.find(apt => apt.time === time);
                  return (
                    <div key={time} className={`p-3 rounded-lg border transition-colors ${
                      appointmentAtTime 
                        ? 'bg-violet-900 border-violet-600' 
                        : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white">{time}</span>
                        {appointmentAtTime ? (
                          <div className="text-sm">
                            <span className="text-violet-300">{appointmentAtTime.clientName}</span>
                            <div className="text-gray-400">{appointmentAtTime.service}</div>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Disponible</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Résumé du jour */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Résumé du jour</h4>
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{appointment.time}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusLabel(appointment.status)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-300">
                      <div>{appointment.clientName}</div>
                      <div>{appointment.service}</div>
                      <div className="text-gray-400">avec {appointment.employee}</div>
                      {appointment.notes && (
                        <div className="text-gray-400 mt-1 italic">{appointment.notes}</div>
                      )}
                    </div>
                  </div>
                ))}

                {filteredAppointments.length === 0 && (
                  <div className="text-center py-8">
                    <CalendarToday className="mx-auto h-8 w-8 text-gray-500 mb-2" />
                    <p className="text-gray-400">Aucun rendez-vous ce jour</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}