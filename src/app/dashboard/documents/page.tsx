'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  file: File;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  result?: unknown;
  error?: string;
}

export default function DocumentsPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      status: 'pending' as const,
      progress: 0,
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/xml': ['.xml'],
      'text/xml': ['.xml'],
    },
    maxSize: 10485760, // 10MB
  });

  const processFile = async (index: number) => {
    const file = uploadedFiles[index];
    setUploadedFiles((prev) =>
      prev.map((f, i) =>
        i === index ? { ...f, status: 'uploading' as const } : f
      )
    );

    // Simulate file processing
    try {
      // Mock progress updates
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setUploadedFiles((prev) =>
          prev.map((f, i) => (i === index ? { ...f, progress } : f))
        );
      }

      // Mock success
      setUploadedFiles((prev) =>
        prev.map((f, i) =>
          i === index
            ? {
                ...f,
                status: 'success' as const,
                progress: 100,
                result: { message: 'Procesado exitosamente' },
              }
            : f
        )
      );

      toast({
        title: 'Éxito',
        description: `${file.file.name} procesado correctamente`,
      });
    } catch (error) {
      setUploadedFiles((prev) =>
        prev.map((f, i) =>
          i === index
            ? {
                ...f,
                status: 'error' as const,
                error: 'Error al procesar el archivo',
              }
            : f
        )
      );

      toast({
        title: 'Error',
        description: `Error al procesar ${file.file.name}`,
        variant: 'destructive',
      });
    }
  };

  const processAllFiles = async () => {
    for (let i = 0; i < uploadedFiles.length; i++) {
      if (uploadedFiles[i].status === 'pending') {
        await processFile(i);
      }
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Documentos</h1>
        <p className="text-muted-foreground">
          Sube y procesa tus documentos fiscales (PDF, XML)
        </p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Subir Documentos</CardTitle>
          <CardDescription>
            Arrastra archivos aquí o haz clic para seleccionar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-primary bg-primary/10'
                : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            {isDragActive ? (
              <p className="text-lg">Suelta los archivos aquí...</p>
            ) : (
              <>
                <p className="text-lg mb-2">
                  Arrastra archivos PDF o XML aquí
                </p>
                <p className="text-sm text-muted-foreground">
                  o haz clic para seleccionar archivos (máx. 10MB)
                </p>
              </>
            )}
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  Archivos ({uploadedFiles.length})
                </h3>
                <Button onClick={processAllFiles} disabled={uploadedFiles.every((f) => f.status !== 'pending')}>
                  Procesar Todos
                </Button>
              </div>

              <div className="space-y-3">
                {uploadedFiles.map((uploadedFile, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 border rounded-lg"
                  >
                    <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {uploadedFile.file.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      {uploadedFile.status === 'uploading' && (
                        <div className="mt-2">
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${uploadedFile.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {uploadedFile.progress}%
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {uploadedFile.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => processFile(index)}
                        >
                          Procesar
                        </Button>
                      )}
                      {uploadedFile.status === 'uploading' && (
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      )}
                      {uploadedFile.status === 'success' && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                      {uploadedFile.status === 'error' && (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos Recientes</CardTitle>
          <CardDescription>
            Historial de documentos procesados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'factura-2024-001.pdf', status: 'success', date: '2024-01-15 10:30' },
              { name: 'nomina-enero-2024.xml', status: 'success', date: '2024-01-14 15:20' },
              { name: 'recibo-2024-045.pdf', status: 'pending', date: '2024-01-14 09:15' },
              { name: 'factura-2024-002.pdf', status: 'error', date: '2024-01-13 14:45' },
              { name: 'declaracion-iva.xml', status: 'success', date: '2024-01-12 11:00' },
            ].map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {doc.status === 'success' && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                  {doc.status === 'pending' && (
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  )}
                  {doc.status === 'error' && (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <Button size="sm" variant="ghost">
                    Ver
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
