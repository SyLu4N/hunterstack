'use client';

import { useState } from 'react';
import { RxDownload } from 'react-icons/rx';

import { Policy } from '@/@types/Policy';
import { api } from '@/services/api';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from './ui/button';

interface Props {
  policy: Policy | undefined;
}

export function ButtonPolicyExport({ policy }: Props) {
  const [isLoadingExportPdf, setIsLoadingExportPdf] = useState(false);

  async function exportPolicy() {
    setIsLoadingExportPdf(true);
    const isLoadingToast = toast.loading('Exportando política...');

    try {
      const response = await api.get(`/scraping/policy/${policy?.slug}/pdf`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');

      link.href = url;
      link.download = `${policy?.category?.name} - ${policy?.title}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);

      toast.success('Política exportada com sucesso!', { id: isLoadingToast });
    } catch (error: any) {
      let message = 'Algo deu errado, tente novamente mais tarde';

      if (error?.response?.data?.message && error?.status !== 500) {
        message = error.response.data.message;
      }

      toast.error(message, { id: isLoadingToast });
    } finally {
      setIsLoadingExportPdf(false);
    }
  }

  return (
    <Button
      className="cursor-pointer !w-8 !h-8 sm:!w-10 sm:!h-10 text-background-500 bg-letter-500 rounded-md hover:bg-letter-400 disabled:opacity-100 disabled:bg-letter-500"
      onClick={exportPolicy}
      disabled={isLoadingExportPdf}
    >
      <abbr
        title="Favoritar"
        className="flex items-center p-0 justify-center w-full h-full"
      >
        {isLoadingExportPdf ? (
          <Loader2Icon className="animate-spin text-md !w-6 !h-6" />
        ) : (
          <RxDownload className="!w-5 !h-5 sm:!w-6 sm:!h-6" />
        )}
      </abbr>
    </Button>
  );
}
