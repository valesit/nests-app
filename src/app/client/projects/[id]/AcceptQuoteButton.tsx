'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface AcceptQuoteButtonProps {
  quoteId: string;
  projectId: string;
  vendorId: string;
  vendorName: string;
  amount: number;
}

export function AcceptQuoteButton({
  quoteId,
  projectId,
  vendorId,
  vendorName,
  amount,
}: AcceptQuoteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'review' | 'payment' | 'success'>('review');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Simulated card details
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  
  const router = useRouter();
  const supabase = createClient();

  const platformFee = amount * 0.05; // 5% platform fee
  const totalAmount = amount + platformFee;

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleAccept = async () => {
    setError(null);
    setLoading(true);

    try {
      // Update quote status to accepted
      const { error: quoteError } = await supabase
        .from('quotes')
        .update({ status: 'accepted' })
        .eq('id', quoteId);

      if (quoteError) throw quoteError;

      // Update project status and assign vendor
      const { error: projectError } = await supabase
        .from('projects')
        .update({
          status: 'in_progress',
          vendor_id: vendorId,
        })
        .eq('id', projectId);

      if (projectError) throw projectError;

      // Reject all other quotes for this project
      await supabase
        .from('quotes')
        .update({ status: 'rejected' })
        .eq('project_id', projectId)
        .neq('id', quoteId);

      setStep('success');
    } catch (err) {
      console.error('Error accepting quote:', err);
      setError('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (step === 'success') {
      router.refresh();
    }
    setIsOpen(false);
    setStep('review');
    setCardNumber('');
    setExpiry('');
    setCvc('');
    setError(null);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary w-full"
      >
        Accept Quote
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 transition-opacity"
              onClick={step !== 'success' ? handleClose : undefined}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full z-10 overflow-hidden">
              {step === 'review' && (
                <>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                      Accept Quote
                    </h2>
                    <p className="text-neutral-600 text-sm mb-6">
                      You&apos;re about to accept the quote from {vendorName}
                    </p>

                    <div className="bg-neutral-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Quote Amount</span>
                        <span className="font-medium">${amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Platform Fee (5%)</span>
                        <span className="font-medium">${platformFee.toLocaleString()}</span>
                      </div>
                      <div className="pt-3 border-t border-neutral-200 flex justify-between">
                        <span className="font-semibold text-neutral-900">Total</span>
                        <span className="font-bold text-primary-600 text-lg">
                          ${totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-500 mt-4">
                      By accepting this quote, you agree to our terms of service. 
                      Payment will be held in escrow until project milestones are completed.
                    </p>
                  </div>

                  <div className="bg-neutral-50 px-6 py-4 flex gap-3">
                    <button
                      onClick={handleClose}
                      className="btn-outline flex-1"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setStep('payment')}
                      className="btn-primary flex-1"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </>
              )}

              {step === 'payment' && (
                <>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-neutral-900">
                        Payment Details
                      </h2>
                      <span className="text-lg font-bold text-primary-600">
                        ${totalAmount.toLocaleString()}
                      </span>
                    </div>

                    {error && (
                      <div className="mb-4 p-3 bg-error-100 border border-error-500 rounded-lg text-error-700 text-sm">
                        {error}
                      </div>
                    )}

                    {/* Simulated Payment Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="label">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          className="input"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="label">Expiry Date</label>
                          <input
                            type="text"
                            value={expiry}
                            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                            className="input"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="label">CVC</label>
                          <input
                            type="text"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                            className="input"
                            placeholder="123"
                            maxLength={3}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Demo Notice */}
                    <div className="mt-4 p-3 bg-info-100 border border-info-500 rounded-lg">
                      <p className="text-info-700 text-sm">
                        <strong>Demo Mode:</strong> This is a simulated payment. 
                        No real charges will be made. Enter any card details to proceed.
                      </p>
                    </div>
                  </div>

                  <div className="bg-neutral-50 px-6 py-4 flex gap-3">
                    <button
                      onClick={() => setStep('review')}
                      className="btn-outline flex-1"
                      disabled={loading}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleAccept}
                      disabled={loading || !cardNumber || !expiry || !cvc}
                      className="btn-primary flex-1"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        `Pay $${totalAmount.toLocaleString()}`
                      )}
                    </button>
                  </div>
                </>
              )}

              {step === 'success' && (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                    Payment Successful!
                  </h2>
                  <p className="text-neutral-600 mb-6">
                    Your payment has been processed. {vendorName} has been notified 
                    and will begin work on your project.
                  </p>
                  <button
                    onClick={handleClose}
                    className="btn-primary"
                  >
                    View Project
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
